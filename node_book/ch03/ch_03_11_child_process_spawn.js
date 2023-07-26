// spawn 객체를 가져온다.
const spawn = require('child_process').spawn;


// spawn 객체에 명령어와 인자들을 넣어준다.
const process = spawn('python3', ['./', 'hello.py']);

process.stdout.on('data', function(data) {
  console.log(data.toString());
}); // 실행 결과

process.stderr.on('data', function(data) {
  console.error(data.toString());
}); // 실행 에러