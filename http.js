const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 8080;

const server = http.createServer((req, res) => {
   res.setHeader('content-type', 'text/html; charset=utf-8');
   if (req.url === '/') {
      res.statusCode = 200;
      res.end('<h1>Bienvenido a mi página de inicio!</h1>');
   } else if (req.url === '/imagen-super-bonita.jpg') {
      fs.readFile('./img/foto.jpg', (err, data) => {
         if (err) {
            res.statusCode = 500;
            res.end('<h1>500 Internal Server Error</h1>');
         } else {
            res.statusCode = 200;
            res.setHeader('content-type', 'image/jpg');
            console.log('data:', data);
            res.end(data);
         }
      });
   } else if (req.url === '/contacto') {
      res.statusCode = 200;
      res.end('<h1>Contacto</h1>');
   } else {
      res.statusCode = 404;
      res.end('<h1>404 Not Found </h1>');
   }
});

//* Con el puerto 0 le digo al servidor que escuche por el primer puerto
//* que encuentre disponible.
// server.listen(0, () => {
//    console.log(`Servidor escuchando por el puerto http://localhost:${server.address().port}`);
// });

server.listen(desiredPort, () => {
   console.log(`Servidor escuchando por el puerto http://localhost:${desiredPort}.`);
});
