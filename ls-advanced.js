const fs = require('node:fs/promises');
const path = require('node:path');
const pc = require('picocolors');

const folder = process.argv[2] ?? '.';

//* Forma 1: promesas con .then y .catch.
// fs.readdir(folder)
//    .then(files => {
//       files.forEach(file => {
//          const filePath = path.join(folder, file)
//          fs.stat(filePath)
//             .then(stats => {
//                const isDirectory = stats.isDirectory();
//                const fileType = isDirectory ? 'd' : 'f';
//                const fileSize = stats.size.toString();
//                const fileModified = stats.mtime.toLocaleString();
//                console.log(`${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)} ${fileModified}`);
//             })
//             .catch(err => {
//                console.error(`No se pudo leer el archivo ${filePath}`);
//                process.exit(1);
//             });
//       });
//    })
//    .catch(err => {
//       console.error(`Error al leer el directorio ${folder} `);
//       process.exit(1);
//    });

//* Forma 2:  función async para trabajar con bloques try catch.
async function ls(folder) {
   let files;
   try {
      files = await fs.readdir(folder);
   } catch {
      console.error(pc.red(`Error al leer el directorio ${folder} `));
      process.exit(1);
   }

   const filePromises = files.map(async file => {
      const filePath = path.join(folder, file);
      let stats;
      try {
         stats = await fs.stat(filePath);
      } catch (error) {
         console.error(pc.red(`No se pudo leer el archivo ${filePath}`));
         process.exit(1);
      }

      const isDirectory = stats.isDirectory();
      const fileType = isDirectory ? 'd' : 'f';
      const fileSize = stats.size.toString();
      const fileModified = stats.mtime.toLocaleString();

      return `${fileType} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)} `;
   });

   Promise.all(filePromises)
      .then(filesInfo => {
         filesInfo.forEach(fileInfo => {
            console.log(fileInfo);
         });
      });
}

ls(folder);
