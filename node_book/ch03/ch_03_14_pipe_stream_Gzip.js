const fs = require('fs');
const zlib = require('zlib');

// highWaterMark에 명시한대로 16byte씩 읽어서 write stream에 적는다
const readStream = fs.createReadStream('./elemental.txt', {highWaterMark: 16});
const zlibStream = zlib.createGzip();
// stream을 쓰면 압축도 할 수 있다
const writeStream = fs.createWriteStream('./elemental.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);
