const fs = require('node:fs/promises');

console.log('Leyendo el primer archivo...');
fs.readFile('./archivo.txt', 'utf-8')
   .then(res => {
      console.log('text:', res);
   });

console.log('Leyendo el segundo archivo...');
fs.readFile('./archivo-2.txt', 'utf-8')
   .then(res => {
      console.log('secondText:', res);
   });
