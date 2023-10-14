import { createApp } from './app.js';
import { MovieModel } from './models/DB/mySql/movie.js';

createApp({ movieModel: MovieModel });
