import {existsSync,readdirSync} from 'node:fs';
if(!existsSync('dist/index.html')||!readdirSync('dist/assets').some(x=>x.endsWith('.js')))process.exit(1);
console.log('BUILD_VERIFIED');
