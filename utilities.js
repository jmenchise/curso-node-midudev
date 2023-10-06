//* en teoría, lo recomendado para importar archivos .json sería así:
//* creando un require para "simular" CommonJS.
//* para archivos JSON grandes, esto es mas recomendado ya que usa
//* require, que es nativo de node.

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
export const readJSON = (path) => require(path);
