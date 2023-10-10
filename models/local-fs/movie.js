import { randomUUID } from 'node:crypto';
import { readJSON } from '../../utilities.js';

//* otra forma de importar archivos .json con ESModules.
//* es recomendable la otra forma,
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));
const movies = readJSON('./movies.json');

export class MovieModel {
   static async getMovies({ genre }) {
      if (genre) {
         return movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
         );
      }
      return movies;
   };

   static async getMovie({ id }) {
      const movie = movies.find(movie => movie.id === id);
      return movie;
   }

   static async createMovie({ movie }) {
      const newMovie = {
         id: randomUUID(),
         ...movie
      };
      movies.push(newMovie);
      return newMovie;
   }

   static async updateMovie({ id, movie }) {
      const movieIndex = movies.findIndex(movie => movie.id === id);
      if (movieIndex === -1) {
         return false;
      }
      const updatedMovie = {
         ...movies[movieIndex],
         ...movie
      };
      movies[movieIndex] = updatedMovie;
      return updatedMovie;
   }

   static async deleteMovie({ id }) {
      const movieIndex = movies.findIndex(movie => movie.id === id);
      if (movieIndex === -1) {
         return false;
      };
      movies.splice(movies[movieIndex], 1);
      return true;
   }
};
