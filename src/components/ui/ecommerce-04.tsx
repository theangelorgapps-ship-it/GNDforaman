// E-commerce 4 from Hirael <https://hirael.com/blocks/ecommerce/ecommerce-04>
// MIT · Mohammad Shehadeh · https://github.com/MohammadShehadeh/hirael

"use client";

import * as React from "react";
import {
  PRODUCTS,
  CATALOG_UPDATED,
  CATEGORIES,
  COLOURS,
  colourOptions,
  money,
  type Product,
} from "@/catalog";
import { ProductCard } from "./product-card-1";
import { useShop } from "@/shop-state";
import { Input } from "./input";
import { SlidersHorizontal, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Rating } from "@/components/ui/ecommerce-04-utils/rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/ecommerce-04-utils/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/ecommerce-04-utils/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/ecommerce-04-utils/toggle-group";

const ENTER =
  "animate-in fade-in slide-in-from-bottom-4 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] fill-mode-both motion-reduce:animate-none";
const SWAP =
  "animate-in fade-in slide-in-from-bottom-2 duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] fill-mode-both motion-reduce:animate-none";

const stagger = (
  index: number,
  step = 60,
  offset = 0,
): React.CSSProperties => ({
  animationDelay: `${offset + index * step}ms`,
});

type Category = string;
type Colour = string;
const RATINGS = [
  { value: "any", label: "Any rating", min: 0 },
  { value: "4", label: "4 stars & up", min: 4 },
  { value: "3", label: "3 stars & up", min: 3 },
] as const;
type RatingFilter = (typeof RATINGS)[number]["value"];
const SORTS = [
  { value: "featured", label: "Shop order" },
  { value: "price-asc", label: "Price low to high" },
  { value: "price-desc", label: "Price high to low" },
  { value: "name", label: "Name A to Z" },
] as const;
type Sort = (typeof SORTS)[number]["value"];
const PRICE_MIN = 0;
const PRICE_MAX = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 5) * 5;

interface Filters {
  categories: Category[];
  price: [number, number];
  colours: Colour[];
  inStock: boolean;
  rating: RatingFilter;
}

const EMPTY_FILTERS: Filters = {
  categories: [],
  price: [PRICE_MIN, PRICE_MAX],
  colours: [],
  inStock: false,
  rating: "any",
};

const labelOf = <T extends string>(
  options: readonly { value: T; label: string }[],
  value: T,
) => options.find((option) => option.value === value)?.label ?? value;

const usd = money;

const matches = (
  product: Product,
  filters: Filters,
  ignoreCategory = false,
) => {
  const minRating =
    RATINGS.find((option) => option.value === filters.rating)?.min ?? 0;
  return (
    (ignoreCategory ||
      filters.categories.length === 0 ||
      product.categories.some((c) => filters.categories.includes(c.value))) &&
    product.price >= filters.price[0] &&
    product.price <= filters.price[1] &&
    (filters.colours.length === 0 ||
      colourOptions(product).some((c) =>
        filters.colours.includes(c.toLowerCase()),
      )) &&
    (!filters.inStock || product.inStock) &&
    product.rating >= minRating
  );
};

const sortProducts = (products: Product[], sort: Sort) => {
  if (sort === "price-asc") return products.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") return products.sort((a, b) => b.price - a.price);
  if (sort === "name")
    return products.sort((a, b) => a.name.localeCompare(b.name));
  return products;
};

const toggle = <T,>(list: T[], value: T) =>
  list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];

interface ActiveFilter {
  key: string;
  label: string;
  remove: (filters: Filters) => Filters;
}

const getActiveFilters = (filters: Filters): ActiveFilter[] => [
  ...filters.categories.map((category) => ({
    key: `category-${category}`,
    label: labelOf(CATEGORIES, category),
    remove: (current: Filters) => ({
      ...current,
      categories: current.categories.filter((c) => c !== category),
    }),
  })),
  ...(filters.price[0] !== PRICE_MIN || filters.price[1] !== PRICE_MAX
    ? [
        {
          key: "price",
          label: `${usd(filters.price[0])} to ${usd(filters.price[1])}`,
          remove: (current: Filters) => ({
            ...current,
            price: EMPTY_FILTERS.price,
          }),
        },
      ]
    : []),
  ...filters.colours.map((colour) => ({
    key: `colour-${colour}`,
    label: labelOf(COLOURS, colour),
    remove: (current: Filters) => ({
      ...current,
      colours: current.colours.filter((c) => c !== colour),
    }),
  })),
  ...(filters.inStock
    ? [
        {
          key: "stock",
          label: "In stock",
          remove: (current: Filters) => ({ ...current, inStock: false }),
        },
      ]
    : []),
  ...(filters.rating !== "any"
    ? [
        {
          key: "rating",
          label: labelOf(RATINGS, filters.rating),
          remove: (current: Filters) => ({
            ...current,
            rating: EMPTY_FILTERS.rating,
          }),
        },
      ]
    : []),
];

interface FilterPanelProps {
  filters: Filters;
  onFiltersChange: (next: Filters) => void;
  products: Product[];
}

const FilterPanel = ({
  filters,
  onFiltersChange,
  products,
}: FilterPanelProps) => {
  const id = React.useId();
  const update = (patch: Partial<Filters>) =>
    onFiltersChange({ ...filters, ...patch });

  return (
    <div
      data-slot="filter-panel"
      className="flex flex-col divide-y divide-border"
    >
      <FieldSet className="gap-3 pb-6">
        <FieldLegend
          variant="label"
          className="text-xs font-normal uppercase text-muted-foreground"
        >
          Category
        </FieldLegend>
        {CATEGORIES.map((category) => {
          const count = products.filter(
            (product) =>
              product.categories.some((c) => c.value === category.value) &&
              matches(product, filters, true),
          ).length;
          const checked = filters.categories.includes(category.value);
          return (
            <Field
              key={category.value}
              orientation="horizontal"
              data-disabled={count === 0 && !checked}
            >
              <Checkbox
                id={`${id}-${category.value}`}
                checked={checked}
                disabled={count === 0 && !checked}
                onCheckedChange={() =>
                  update({
                    categories: toggle(filters.categories, category.value),
                  })
                }
              />
              <FieldLabel
                htmlFor={`${id}-${category.value}`}
                className="font-normal"
              >
                {category.label}
              </FieldLabel>
              <span className="ms-auto text-xs tabular-nums text-muted-foreground">
                {count}
              </span>
            </Field>
          );
        })}
      </FieldSet>

      <FieldSet className="gap-4 py-6">
        <FieldLegend
          variant="label"
          className="text-xs font-normal uppercase text-muted-foreground"
        >
          Price
        </FieldLegend>
        <Slider
          min={PRICE_MIN}
          max={PRICE_MAX}
          step={1}
          minStepsBetweenThumbs={1}
          value={filters.price}
          onValueChange={(next) => update({ price: [next[0], next[1]] })}
          aria-label="Price range"
        />
        <div className="flex items-center justify-between text-sm tabular-nums">
          <span>
            <span className="sr-only">From </span>
            {usd(filters.price[0])}
          </span>
          <span>
            <span className="sr-only">To </span>
            {usd(filters.price[1])}
            {filters.price[1] === PRICE_MAX && "+"}
          </span>
        </div>
      </FieldSet>

      <FieldSet className="gap-3 py-6">
        <FieldLegend
          variant="label"
          className="text-xs font-normal uppercase text-muted-foreground"
        >
          Colour
        </FieldLegend>
        <ToggleGroup
          type="multiple"
          spacing={2}
          value={filters.colours}
          onValueChange={(next) => update({ colours: next as Colour[] })}
          className="flex-wrap"
        >
          {COLOURS.map((colour) => (
            <ToggleGroupItem
              key={colour.value}
              value={colour.value}
              aria-label={colour.label}
              title={colour.label}
              style={{ backgroundColor: colour.swatch }}
              className="size-7 min-w-0 rounded-full border border-foreground/15 p-0 ring-offset-2 ring-offset-background transition-shadow duration-150 hover:opacity-90 data-[state=on]:ring-2 data-[state=on]:ring-foreground"
            />
          ))}
        </ToggleGroup>
      </FieldSet>

      <Field orientation="horizontal" className="py-6">
        <FieldLabel htmlFor={`${id}-stock`} className="font-normal">
          In stock only
        </FieldLabel>
        <Switch
          id={`${id}-stock`}
          checked={filters.inStock}
          onCheckedChange={(checked) => update({ inStock: checked })}
        />
      </Field>

      {PRODUCTS.some((p) => p.reviewCount > 0) && (
        <FieldSet className="gap-3 pt-6">
          <FieldLegend
            variant="label"
            className="text-xs font-normal uppercase text-muted-foreground"
          >
            Rating
          </FieldLegend>
          <RadioGroup
            value={filters.rating}
            onValueChange={(next) => update({ rating: next as RatingFilter })}
          >
            {RATINGS.map((option) => (
              <Field key={option.value} orientation="horizontal">
                <RadioGroupItem
                  id={`${id}-rating-${option.value}`}
                  value={option.value}
                />
                <FieldLabel
                  htmlFor={`${id}-rating-${option.value}`}
                  className="items-center font-normal"
                >
                  {option.min > 0 && (
                    <Rating value={option.min} readOnly size="sm" aria-hidden />
                  )}
                  {option.label}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        </FieldSet>
      )}
    </div>
  );
};

const Ecommerce04 = ({
  onProduct,
}: {
  onProduct: (product: Product) => void;
}) => {
  const { wishlist } = useShop();
  const [savedOnly, setSavedOnly] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [filters, setFilters] = React.useState<Filters>(EMPTY_FILTERS);
  const [sort, setSort] = React.useState<Sort>("featured");

  const matchingCollection = PRODUCTS.filter(
    (product) =>
      (!savedOnly || wishlist.includes(product.id)) &&
      product.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
  const results = sortProducts(
    matchingCollection.filter((product) => matches(product, filters)),
    sort,
  );
  const active = getActiveFilters(filters);
  const resultKey = JSON.stringify([filters, sort, query, savedOnly]);
  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setQuery("");
  };
  const clearAll = () => {
    clearFilters();
    setSavedOnly(false);
  };
  const resultLabel = `${results.length} ${savedOnly ? "saved " : ""}${results.length === 1 ? "product" : "products"}`;
  const noSavedProducts = savedOnly && wishlist.length === 0;
  const hasRefinements = active.length > 0 || !!query;
  const catalogDate = new Date(
    `${CATALOG_UPDATED}T12:00:00Z`,
  ).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <section data-slot="category-page" className="store-catalog">
      <div className="flex w-full flex-col gap-9">
        <div
          data-slot="category-header"
          className="flex max-w-xl flex-col gap-4"
        >
          <span
            className={cn(ENTER, "text-xs uppercase text-muted-foreground")}
          >
            Shop
          </span>
          <h1
            style={stagger(1, 80)}
            className={cn(
              ENTER,
              "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
            )}
          >
            Carry the GoodNews.
          </h1>
          <p
            style={stagger(2, 80)}
            className={cn(
              ENTER,
              "text-base leading-relaxed text-muted-foreground",
            )}
          >
            Books to grow your faith. Little things to share it. Explore the
            official GoodNews collection, wherever the day takes you.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-8">
          <aside
            data-slot="category-filters"
            aria-label="Filters"
            style={stagger(3, 80)}
            className={cn(
              ENTER,
              "hidden lg:sticky lg:top-8 lg:block lg:self-start",
            )}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="text-sm font-medium">Filters</span>
              <Button
                type="button"
                variant="ghost"
                size="xs"
                onClick={clearAll}
                disabled={!hasRefinements && !savedOnly}
                className="text-muted-foreground"
              >
                Clear all
              </Button>
            </div>
            <div className="pt-6">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                products={matchingCollection}
              />
            </div>
          </aside>

          <div
            data-slot="category-results"
            style={stagger(4, 80)}
            className={cn(ENTER, "flex min-w-0 flex-col gap-6")}
          >
            <div className="flex flex-col gap-4 border-b border-border pb-4">
              <div
                className="store-collection-tabs"
                aria-label="Product collection"
              >
                <Button
                  type="button"
                  variant={savedOnly ? "outline" : "default"}
                  aria-pressed={!savedOnly}
                  onClick={() => setSavedOnly(false)}
                >
                  All products
                </Button>
                <Button
                  type="button"
                  variant={savedOnly ? "default" : "outline"}
                  aria-pressed={savedOnly}
                  onClick={() => setSavedOnly(true)}
                >
                  Saved products{" "}
                  <span className="tabular-nums">({wishlist.length})</span>
                </Button>
              </div>
              <label className="store-search">
                <span className="sr-only">Search products</span>
                <Input
                  type="search"
                  placeholder="Search books, clothing, gifts…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </label>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="lg:hidden"
                      >
                        <SlidersHorizontal />
                        Filters
                        {active.length > 0 && (
                          <span className="tabular-nums">
                            ({active.length})
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="bottom"
                      className="shop-scope shop-filter-sheet max-h-[85svh] gap-0 rounded-t-xl"
                    >
                      <SheetHeader className="border-b border-border">
                        <SheetTitle>Filters</SheetTitle>
                        <SheetDescription>
                          Results update as you change them.
                        </SheetDescription>
                      </SheetHeader>
                      <SheetBody className="min-h-0 py-6">
                        <FilterPanel
                          filters={filters}
                          onFiltersChange={setFilters}
                          products={matchingCollection}
                        />
                      </SheetBody>
                      <SheetFooter className="flex-row border-t border-border">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={clearAll}
                          disabled={!hasRefinements && !savedOnly}
                        >
                          Clear all
                        </Button>
                        <SheetClose asChild>
                          <Button type="button" className="flex-1 tabular-nums">
                            {results.length === 0
                              ? "No matches"
                              : `Show ${results.length} ${results.length === 1 ? "result" : "results"}`}
                          </Button>
                        </SheetClose>
                      </SheetFooter>
                    </SheetContent>
                  </Sheet>
                  <p
                    aria-live="polite"
                    className="text-sm tabular-nums text-muted-foreground"
                  >
                    {resultLabel}
                  </p>
                </div>
                <Select
                  value={sort}
                  onValueChange={(next) => setSort(next as Sort)}
                >
                  <SelectTrigger
                    size="sm"
                    aria-label="Sort products"
                    className="w-auto min-w-40"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent position="popper" align="end">
                    {SORTS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {active.length > 0 && (
                <ul
                  data-slot="active-filters"
                  aria-label="Active filters"
                  className="flex flex-wrap items-center gap-2"
                >
                  {active.map((filter) => (
                    <li
                      key={filter.key}
                      className="animate-in fade-in zoom-in-95 duration-200 motion-reduce:animate-none"
                    >
                      <Badge
                        variant="outline"
                        className="h-7 gap-1 pe-1 ps-2.5 font-normal"
                      >
                        {filter.label}
                        <button
                          type="button"
                          aria-label={`Remove ${filter.label}`}
                          onClick={() => setFilters(filter.remove(filters))}
                          className="grid size-5 place-items-center rounded-full text-muted-foreground outline-none transition-colors duration-150 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <X className="size-3" />
                        </button>
                      </Badge>
                    </li>
                  ))}
                  <li>
                    <Button
                      type="button"
                      variant="link"
                      size="xs"
                      onClick={clearAll}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  </li>
                </ul>
              )}
            </div>

            <p className="store-catalog-note">
              Catalog updated{" "}
              <time dateTime={CATALOG_UPDATED}>{catalogDate}</time>. Check
              current prices and availability on the official store.
            </p>
            {results.length > 0 ? (
              <div
                key={resultKey}
                data-slot="product-grid"
                className="store-product-grid"
              >
                {results.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOpen={() => onProduct(product)}
                  />
                ))}
              </div>
            ) : (
              <Empty
                data-slot="product-empty"
                className={cn(SWAP, "border border-border py-16")}
              >
                <EmptyHeader>
                  <EmptyTitle>
                    {noSavedProducts
                      ? "Your saved products live here"
                      : savedOnly
                        ? "No saved products match"
                        : "Nothing matches those filters"}
                  </EmptyTitle>
                  <EmptyDescription>
                    {noSavedProducts
                      ? "Tap a heart on any product to keep it here on this device."
                      : "Try another search or clear your filters to see more of the collection."}
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  {!noSavedProducts && hasRefinements && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={clearFilters}
                    >
                      Clear search and filters
                    </Button>
                  )}
                  {savedOnly && (
                    <Button type="button" variant="outline" onClick={clearAll}>
                      Browse all products
                    </Button>
                  )}
                </EmptyContent>
              </Empty>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecommerce04;
