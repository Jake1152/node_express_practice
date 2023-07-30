const fs = require('fs');

const writeStream = fs.createWriteStream('./be_wrote.txt');
writeStream.on('finish', () => {
  console.log('파일 쓰기 완료');
});

writeStream.write("글쓰기\r\n");
writeStream.write("한줄 더 \r\n");
writeStream.end();