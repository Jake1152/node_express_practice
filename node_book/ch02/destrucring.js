var candyMachine = {
    status: {
      name: 'node',
      count: 5,
    },
    getCandy: function () {
      this.status.count--;
      return this.status.count;
    },
  };
  var getCandy = candyMachine.getCandy;
  var count = candyMachine.status.count;
//   이 코드를 다음과 같이 바꿀 수 있습니다.
  
  const candyMachine = {
    status: {
      name: 'node',
      count: 5,
    },
    getCandy() {
      this.status.count--;
      return this.status.count;
    },
  };
  const { getCandy, status: { count } } = candyMachine;