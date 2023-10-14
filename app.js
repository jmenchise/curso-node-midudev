import express, { json } from 'express';
import { createMovieRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

export const createApp = ({ movieModel }) => {
   const PORT = process.env.PORT ?? 8080;

   const app = express();
   app.disable('x-powered-by');
   app.use(json());
   app.use(corsMiddleware());

   app.use('/movies', createMovieRouter({ movieModel }));

   app.listen(PORT, () => {
      console.log(`Servidor express escuchando por el puerto http://localhost:${PORT}`);
   });
};
