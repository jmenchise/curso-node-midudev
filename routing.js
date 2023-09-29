const http = require('node:http');

const port = 8080;

const dittoJSON = require('./pokemon/ditto.json');

const server = http.createServer((req, res) => {
   const { method, url } = req;

   if (method === 'GET') {
      if (url === '/') {
         res.setHeader('content-type', 'text/html; charset=utf-8');
         res.end('<h1>Mi página de inicio.</h1>');
         return;
      }
      if (url === '/pokemon/ditto') {
         res.setHeader('content-type', 'application/json; charset=utf-8');
         res.end(JSON.stringify(dittoJSON));
         return;
      }
      res.statusCode = 404;
      res.setHeader('content-type', 'text/html; chartset=utf-8');
      res.end('<h1>Error 404 URL NOT FOUND</h1>');
   }
});

server.listen(port, () => {
   console.log(`Servidor escuchando por el puerto http://localhost:${port}`);
});

server.on('error', () => {
   console.error(`Error al intentar levantar el servidor en ${port}`);
});
