import mysql from 'mysql2/promise';
import 'dotenv/config';

const DEFAULT_CONFIG = {
   host: '127.0.0.1',
   port: 3306,
   user: 'root',
   password: '',
   database: 'moviesdb'
};

const connectionStr = process.env.DATABASE_URL ?? DEFAULT_CONFIG;

let connection;

try {
   connection = await mysql.createConnection(connectionStr);
   console.log('Conexión con la DB exitosa!');
} catch (error) {
   console.error('Error al conectar con la DB. Detalle: ', error.message);
};

export class MovieModel {
   static async getMovies({ genre }) {
      if (genre) {
         const lowerCaseGenre = genre.toLowerCase();
         const [genreResult] = await connection.query(
            'SELECT id genreId FROM genre WHERE name = ?;', [lowerCaseGenre]
         );
         if (genreResult.length === 0) {
            return null;
         }
         const [{ genreId }] = genreResult;
         const [movieIdResult] = await connection.query(
            'SELECT BIN_TO_UUID(movie_id) movieId FROM movie_genres WHERE genre_id = ?;',
            [genreId]
         );
         // TODO No funciona si tiene que buscar mas de una película.
         if (movieIdResult.length > 1) {
            // const movieIdCollection = movieIdResult.map(movie => movie.movieId);
            // const [filteredMovies] = await connection.query(
            //    'SELECT * FROM movie WHERE id IN (' + movieIdCollection.map(id => `UNHEX('${id}')`).join(', ') + ')',
            //    [movieIdCollection]
            // );
            // return filteredMovies;
         } else {
            const [{ movieId }] = movieIdResult;
            return await this.getMovie({ id: movieId });
         }
      }
      const [movies] = await connection.query(
         'SELECT *, BIN_TO_UUID(id) id FROM movie;'
      );
      return movies;
   };

   static async getMovie({ id }) {
      const [movieResult] = await connection.query(
         'SELECT *, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);', [id]
      );
      if (movieResult.length === 0) {
         return null;
      }
      return movieResult[0];
   }

   static async createMovie({ movie }) {
      const {
         title,
         year,
         director,
         duration,
         rate,
         poster,
         genre: genreCollection
      } = movie;

      //* Podríamos usar crypto.UUID() para crear el id, ya que el insert de mysql no lo devuelve,
      //* pero en este caso vamos a utilizar a mysql directamente para que nos genere un UUID y luego
      //* lo cargamos en la DB.

      const [UUIDresult] = await connection.query('SELECT UUID() uuid;');
      const [{ uuid }] = UUIDresult;
      try {
         await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES
            (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);`,
            [uuid, title, year, director, duration, poster, rate]
         );
      } catch (error) {
         console.error('Error al cargar en la base de datos.');
         throw new Error('Error al cargar en la base de datos.');
      }

      const newMovie = await this.getMovie({ id: uuid });
      return newMovie;
      // TODO falta cargar el género en la DB.
   }

   static async updateMovie({ id, movie }) {
      // TODO Falta realizar el update
   }

   static async deleteMovie({ id }) {
      // TODO Falta realizar el Delete
   }
}
