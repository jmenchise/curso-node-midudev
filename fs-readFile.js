const fs = require('node:fs');

console.log('Leyendo el primer archivo...');
fs.readFile('./archivo.txt', 'utf-8', (_, data) => {
   console.log('text:', data);
});

console.log('Leyendo el segundo archivo...');
fs.readFile('./archivo-2.txt', 'utf-8', (_, data) => {
   console.log('secondText:', data);
});
