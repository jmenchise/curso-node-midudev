import { MovieModel } from '../models/local-fs/movie.js';
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

export class MovieController {
   static async getMovies(req, res) {
      const { genre } = req.query;
      const movies = await MovieModel.getMovies({ genre });
      res.json(movies);
   }

   static async getMovie(req, res) {
      const { id } = req.params;
      const movie = await MovieModel.getMovie({ id });
      if (movie) {
         return res.json(movie);
      }
      res.status(404).json({ message: 'Movie Not Found' });
   }

   static async createMovie(req, res) {
      const result = validateMovie(req.body);
      if (result.error) {
         return res.status(400).json({ error: JSON.parse(result.error.message) });
      }
      const newMovie = await MovieModel.createMovie({ movie: result.data });
      res.status(201).json(newMovie);
   }

   static async updateMovie(req, res) {
      const result = validatePartialMovie(req.body);
      if (result.error) {
         return res.status(400).json({ error: JSON.parse(result.error.message) });
      };
      const { id } = req.params;
      const updatedMovie = await MovieModel.updateMovie({ id, movie: result.data });
      if (!updatedMovie) {
         return res.status(404).json({ message: 'Movie Not Found' });
      }
      res.status(201).json(updatedMovie);
   }

   static async deleteMovie(req, res) {
      const { id } = req.params;
      const deletedMovie = await MovieModel.deleteMovie({ id });
      if (!deletedMovie) {
         return res.status(404).json({ message: 'Movie Not Found' });
      };
      res.json({ message: 'Movie deleted!' });
   }
};
