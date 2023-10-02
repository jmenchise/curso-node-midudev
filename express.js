const express = require('express');
const dittoJSON = require('./pokemon/ditto.json');

const app = express();

app.disable('x-powered-by');

const PORT = process.env.PORT ?? 3000;

app.use(express.json());

// app.use((req, res, next) => {
//    if (req.method !== 'POST') {
//       next();
//       return;
//    }
//    if (req.headers['content-type'] !== 'application/json') {
//       next();
//       return;
//    }

//    let body = '';
//    req.on('data', chunk => {
//       body += chunk.toString();
//    });
//    req.on('end', () => {
//       const data = JSON.parse(body);
//       data.timeStamp = Date.now();
//       req.body = data;
//       next();
//    });
// });

app.get('/', (req, res) => {
   res.status(200).send('<h1>Hola Mundo!!</h1>');
});

app.get('/pokemon/ditto', (req, res) => {
   res.json(dittoJSON);
});

app.post('/pokemon', (req, res) => {
   const data = req.body;
   res.status(201).json(data);
});

app.use((req, res) => {
   res.status(404).end('<h1> Error 404 URL NOT FOUND </h1>');
});

app.listen(PORT, () => {
   console.log(`Servidor express escuchando puerto http://localhost:${PORT} `);
});
