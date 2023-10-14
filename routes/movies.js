import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

export const createMovieRouter = ({ movieModel }) => {
   const movieController = new MovieController({ movieModel });

   return Router()
      .get('/', movieController.getMovies)
      .get('/:id', movieController.getMovie)
      .post('/', movieController.createMovie)
      .patch('/:id', movieController.updateMovie)
      .delete('/:id', movieController.deleteMovie);
};
