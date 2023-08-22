// 옵셔널 체이닝 연산자는 null이나 undefined의 속성을 조회하는 경우 에러가 발생하는 것을 막습니다.
const a = {}
a.b; // a가 객체이므로 문제없음

const c = null;
try {
  c.d;
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading 'd')
}
c?.d; // 문제없음

try {
  c.f();
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading 'f')
}
c?.f(); // 문제없음

try {
  c[0];
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading '0')
}
c?.[0]; // 문제없음