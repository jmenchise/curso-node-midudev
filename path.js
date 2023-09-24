const path = require('node:path');

//* Barra separadora según OS.
console.log(path.sep);

const filePath = path.join('content', 'subfolder', 'test.txt');
console.log('filePath:', filePath);

const base = path.basename('tmp/midu-secret-files/pasword.txt');
console.log('base:', base);

const filename = path.basename('tmp/midu-secret-files/pasword.txt', '.txt');
console.log('filename:', filename);

const extension = path.extname('image.jpg');
console.log('extension:', extension);
