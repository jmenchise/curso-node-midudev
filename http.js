const http = require('node:http');
const { findAvailablePort } = require('./free-port.js');

const desiredPort = process.env.PORT ?? 8080;

const server = http.createServer((req, res) => {
   console.log('request received');
   res.end('Hola mundo!');
});

// server.listen(8080, () => {
//    console.log('Servidor escuchando por el puerto 8080.');
// });

//* Con el puerto 0 le digo al servidor que escuche por el primer puerto
//* que encuentre disponible.
// server.listen(0, () => {
//    console.log(`Servidor escuchando por el puerto http://localhost:${server.address().port}`);
// });

//* Con es
findAvailablePort(desiredPort).then(port => {
   server.listen(port, () => {
      console.log(`Servidor escuchando por el puerto http://localhost:${port}.`);
   });
});
