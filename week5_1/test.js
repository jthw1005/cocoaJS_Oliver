function showName(name) {
  console.log(name);
}

const tId = setInterval(showName, 3000, "mike");

clearInterval(tId); // 스케줄링 취소
