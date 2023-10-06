import { Router } from 'express';
import { readJSON } from '../utilities.js';
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';
import { randomUUID } from 'node:crypto';

//* otra forma de importar archivos .json con ESModules.
//* es recomendable la otra forma,
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

const movies = readJSON('./movies.json');

export default Router()
   .get('/', (req, res) => {
      const { genre } = req.query;
      if (genre) {
         const filteredMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
         );
         return res.json(filteredMovies);
      }
      res.json(movies);
   })
   .get('/:id', (req, res) => {
      const { id } = req.params;
      const movie = movies.find(movie => movie.id === id);
      if (movie) {
         return res.json(movie);
      }
      res.status(404).json({ message: 'Movie Not Found' });
   })
   .post('/', (req, res) => {
      const result = validateMovie(req.body);
      if (result.error) {
         return res.status(400).json({ error: JSON.parse(result.error.message) });
      }
      const newMovie = {
         id: randomUUID(),
         ...result.data
      };
      movies.push(newMovie);
      res.status(201).json(newMovie);
   })
   .patch('/:id', (req, res) => {
      const result = validatePartialMovie(req.body);
      if (result.error) {
         return res.status(400).json({ error: JSON.parse(result.error.message) });
      };
      const { id } = req.params;
      const movieIndex = movies.findIndex(movie => movie.id === id);
      if (movieIndex === -1) {
         return res.status(404).json({ message: 'Movie Not Found' });
      }
      const updatedMovie = {
         ...movies[movieIndex],
         ...result.data
      };
      movies[movieIndex] = updatedMovie;
      res.status(201).json(updatedMovie);
   })
   .delete('/:id', (req, res) => {
      const { id } = req.params;
      const movieIndex = movies.findIndex(movie => movie.id === id);
      if (movieIndex === -1) {
         return res.status(404).json({ message: 'Movie Not Found' });
      };
      movies.splice(movies[movieIndex], 1);
      res.json({ message: 'Movie deleted!' });
   });
