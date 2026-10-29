const response=await fetch('http://127.0.0.1:5173/');
const html=await response.text();
if(!response.ok||!html.includes('GoodNews Daily Connect')||!html.includes('/src/main.tsx'))throw new Error('Local entrypoint unavailable');
for(const path of ['/src/main.tsx','/assets/october.png','/assets/profile.png','/assets/alarm.png','/assets/teens.png']){const r=await fetch('http://127.0.0.1:5173'+path);if(!r.ok)throw new Error('Missing '+path);}
console.log('LOCAL_SERVER_VERIFIED');
