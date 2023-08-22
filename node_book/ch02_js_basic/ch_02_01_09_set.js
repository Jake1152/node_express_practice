const s = new Set();
s.add(false); // add(요소)로 Set에 추가합니다
s.add(1);
s.add('1');
s.add(1); // 중복이므로 무시됩니다
s.add(2);

console.log(s.size); // 중복이 제거되어 4

s.has(1); // has(요소)로 요소 존재 여부를 확인합니다
console.log(s.has(1)); // true

for (const a of s) {
  console.log(a); // false 1 '1' 2
}

s.forEach((a) => {
  console.log(a); // false 1 '1' 2
})

s.delete(2); // delete(요소)로 요소를 제거합니다
s.clear(); // clear()로 전부 제거합니다
// Set은 중복을 허용하지 않는다는 것이 가장 큰 특징입니다. 따라서 배열 자료구조를 사용하고 싶으나 중복은 허용하고 싶지 않을 때 Set을 대신 사용하면 됩니다.

// 또는 기존 배열에서 중복을 제거하고 싶을 때도 Set을 사용합니다. 다음 코드를 보세요.

// const arr = [1, 3, 2, 7, 2, 6, 3, 5];

// const s = new Set(arr);
// const result = Array.from(s);
// console.log(result); // 1, 3, 2, 7, , 5