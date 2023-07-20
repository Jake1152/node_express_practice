const m = new Map();
m.set('a', 'b'); // set(key ,value)으로 Map에 속성 추가
m.set(3, 'c'); // 문자열이 아닌 값을 키로 사용
const d = {};
m.set(d, 'e'); // 객체도 가능

m.get(d);
console.log(d, 'e');

m.get(d);
console.log(m.get(d));
console.log(m.size); // 3
for (const [k, v] of m) {
    console.log(k, v); // 'a', 'b', 3, 'c', {}, 'e'
} // 속성 간의 순서도 보장된다.

m.forEach((v, k) => {
    console.log(k, v);
});

m.has(d);
console.log(m.has(d));

m.delete(d);
m.clear();
console.log(m.size); // 0