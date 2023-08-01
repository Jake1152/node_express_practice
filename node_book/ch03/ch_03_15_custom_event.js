const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1', () => {
    console.log('이벤트 1');
});

myEvent.on('event2', () => {
    console.log('이벤트 2');
});
myEvent.on('event2', () => {
    console.log('이벤트 2 추가');
});


myEvent.once('event3', () => {
    console.log('이벤트 3');
}); // 한번만 실행

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.emit('event3');
myEvent.emit('event3'); // once()였으므로 한번만 출력됨

myEvent.emit('event4', () => {
    console.log('이벤트 4');
});

myEvent.removeAllListeners('even4');
myEvent.emit('event4');

const listener = () => {
    console.log('이벤트 5')
}

myEvent.on('event5', listener);
myEvent.removeListener('event5', listener);
myEvent.emit('event5');

console.log(myEvent.listenerCount('event2'));
