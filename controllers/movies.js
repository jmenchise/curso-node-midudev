import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

export class MovieController {
   constructor({ movieModel }) {
      this.movieModel = movieModel;
   }

   getMovies = async (req, res) => {
      const { genre } = req.query;
      const movies = await this.movieModel.getMovies({ genre });
      if (!movies) {
         return res.status(404).json({ message: 'Movie Not Found' });
      }
      res.json(movies);
   };

   getMovie = async (req, res) => {
      const { id } = req.params;
      const movie = await this.movieModel.getMovie({ id });
      if (movie) {
         return res.json(movie);
      }
      res.status(404).json({ message: 'Movie Not Found' });
   };

   createMovie = async (req, res) => {
      const result = validateMovie(req.body);
      if (result.error) {
         return res.status(400).json({ error: JSON.parse(result.error.message) });
      }
      const newMovie = await this.movieModel.createMovie({ movie: result.data });
      res.status(201).json(newMovie);
   };

   updateMovie = async (req, res) => {
      const result = validatePartialMovie(req.body);
      if (result.error) {
         return res.status(400).json({ error: JSON.parse(result.error.message) });
      };
      const { id } = req.params;
      const updatedMovie = await this.movieModel.updateMovie({ id, movie: result.data });
      if (!updatedMovie) {
         return res.status(404).json({ message: 'Movie Not Found' });
      }
      res.status(201).json(updatedMovie);
   };

   deleteMovie = async (req, res) => {
      const { id } = req.params;
      const deletedMovie = await this.movieModel.deleteMovie({ id });
      if (!deletedMovie) {
         return res.status(404).json({ message: 'Movie Not Found' });
      };
      res.json({ message: 'Movie deleted!' });
   };
};
