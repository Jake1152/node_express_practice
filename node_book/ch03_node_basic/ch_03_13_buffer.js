const buffer = Buffer.from('저를 버퍼로 바꿔보세요');
console.log('from():', buffer);
// 16진수로 변환됨
// 송수신을 위해 이렇게 하는 듯하다
console.log('length:', buffer.length);
console.log('toString():', buffer.toString());

const array = [Buffer.from('띄엄 ' ), Buffer.from('띄엄 ' ), Buffer.from('띄어쓰기')];
// 버퍼 여러개가 배열에 들어있는 경우
const buffer2 = Buffer.concat(array);
// 버퍼 여러개를 합칠 수도 있다
console.log('concat():', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc():', buffer3);