const express = require('express');
const crypto = require('node:crypto');
const movies = require('./movies.json');
const { validateMovie } = require('./schemas/movies');

const PORT = process.env.PORT ?? 8080;

const app = express();
app.disable('x-powered-by');
app.use(express.json());

app.get('/movies', (req, res) => {
   const { genre } = req.query;
   if (genre) {
      const filteredMovies = movies.filter(
         movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      );
      return res.json(filteredMovies);
   }
   res.json(movies);
});

app.get('/movies/:id', (req, res) => {
   const { id } = req.params;
   const movie = movies.find(movie => movie.id === id);
   if (movie) {
      return res.json(movie);
   }
   res.status(404).json({ message: 'Movie Not Found' });
});

app.post('/movies', (req, res) => {
   const result = validateMovie(req.body);
   if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
   }
   const newMovie = {
      id: crypto.randomUUID(),
      ...result.data
   };
   movies.push(newMovie);
   res.status(201).json(newMovie);
});

app.listen(PORT, () => {
   console.log(`Servidor express escuchando por el puerto http://localhost:${PORT}`);
});
