import { Router } from 'express';
import { MovieController } from '../controllers/movies.js';

export default Router()
   .get('/', MovieController.getMovies)
   .get('/:id', MovieController.getMovie)
   .post('/', MovieController.createMovie)
   .patch('/:id', MovieController.updateMovie)
   .delete('/:id', MovieController.deleteMovie);
