const fs = require('node:fs/promises');

(
   async () => {
      console.log('Leyendo el primer archivo...');
      const text = await fs.readFile('./archivo.txt', 'utf-8');
      console.log('text:', text);

      console.log('Leyendo el segundo archivo...');
      const secondText = await fs.readFile('./archivo-2.txt', 'utf-8');
      console.log('secondText:', secondText);
   }
)();
