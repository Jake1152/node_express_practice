const fs = require('fs');

// highWaterMark에 명시한대로 16byte씩 읽어서 write stream에 적는다
const readStream = fs.createReadStream('./elemental.txt', {highWaterMark: 16});
const writeStream = fs.createWriteStream('./elemental_copy_using_stream.txt');
readStream.pipe(writeStream);
// pipe를 통해서 데이터 넘겨준다
// pipe가 없으면  const writeStream = fs.createWriteStream('./elemental_copy_using_stream.txt');
// 빈 파일만 생성된다.