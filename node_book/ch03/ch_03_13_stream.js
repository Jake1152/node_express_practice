const fs = require('fs');
// createReadStream 한번에 읽는 코드 조각이 64kb이다 
// const readStream = fs.createReadStream('./readme3.txt');
const readStream = fs.createReadStream('./readme3.txt', {highWaterMark: 16});

const data = [];
// stream은 한번에 보내지 않고
// 일정 크기대로 잘라서 순서대로 보내준다.
readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log(chunk);
});
readStream.on('end', () => {
  console.log('end: ', Buffer.concat(data).toString());
});

// stream도 비동기이므로 실패할 가능성이 있으니 error처리가 필요하다.
readStream.on('error', (err) => {
  console.log('error:', err);
});
