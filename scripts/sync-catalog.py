"""Refresh the public GoodNews catalog and its image assets without store credentials."""
from pathlib import Path
import concurrent.futures
import datetime
import html
import json
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
SOURCE = 'https://goodnewsdailydevotional.com/shop/'

def fetch(url):
    return subprocess.check_output(['curl', '-fsSL', '--max-time', '45', url])

def plain(value):
    return html.unescape(re.sub('<[^>]*>', ' ', value)).strip()

shop = fetch(SOURCE).decode()
raw = json.loads(fetch('https://goodnewsdailydevotional.com/wp-json/wc/store/v1/products?per_page=100'))
ids = list(dict.fromkeys(map(int, re.findall(r'data-product_id=["\'](\d+)', shop))))
products, jobs = [], []
dest = ROOT / 'public/assets/products'
dest.mkdir(parents=True, exist_ok=True)
for product_id in ids:
    p = next(x for x in raw if x['id'] == product_id)
    images = []
    for index, image in enumerate(p['images']):
        name = f"{product_id}-{index}{Path(image['src'].split('?')[0]).suffix}"
        images.append('/assets/products/' + name)
        jobs.append((image['src'], dest / name))
    attributes = [{'name': plain(a['name']), 'options': list(dict.fromkeys(plain(t['name']) for t in a['terms']))} for a in p['attributes'] if a['has_variations']]
    description = [re.sub(r'\s+', ' ', plain(x)).strip() for x in re.split(r'</(?:p|li|h[1-6])>', p['description']) if plain(x)]
    categories = [{'value': c['slug'], 'label': plain(c['name'])} for c in p['categories'] if c['slug'] != 'merchandise']
    if not categories and 'WRISTBAND' in p['name']:
        categories = [{'value': 'wrist-bands', 'label': 'Wrist Bands'}]
    products.append({
        'id': str(product_id), 'name': plain(p['name']), 'slug': p['slug'], 'url': p['permalink'],
        'price': int(p['prices']['price']) / 10 ** p['prices']['currency_minor_unit'],
        'originalPrice': int(p['prices']['regular_price']) / 10 ** p['prices']['currency_minor_unit'],
        'currency': p['prices']['currency_code'], 'inStock': p['is_in_stock'] and p['is_purchasable'],
        'rating': float(p['average_rating']), 'reviewCount': p['review_count'],
        'images': images, 'description': description, 'categories': categories, 'attributes': attributes,
        'variations': [{'id': str(v['id']), 'attributes': v['attributes']} for v in p['variations']],
    })

def download(job):
    url, path = job
    if not path.exists():
        path.write_bytes(fetch(url))
    return path.stat().st_size

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
    sizes = list(executor.map(download, jobs))
assert len(products) > 0 and all(size > 0 for size in sizes)
(ROOT / 'src/catalog.json').write_text(json.dumps({'source': SOURCE, 'updated': datetime.date.today().isoformat(), 'products': products}, ensure_ascii=False, indent=2) + '\n')
print(f'CATALOG_SYNCED: {len(products)} products, {len(images)} last-product images, {len(jobs)} total images')
