// 캐릭터 이미지
// 캐릭터 크기
// 캐릭터 체력
// 캐릭터 속도

const backBtn = document.querySelector(".scoreBoard_btn");
const gameBtn1 = document.querySelector("#gameBtn1");
const gameBtn2 = document.querySelector("#gameBtn2");
const gameBtn3 = document.querySelector("#gameBtn3");
const gameBtn4 = document.querySelector("#gameBtn4");
const timeLeft = document.querySelector(".time_left");
const startBtn = document.querySelector(".start_btn");
const successBtn = document.querySelector(".mission_success");
const failBtn = document.querySelector(".mission_fail");
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

const gameSoundSuccess = new Audio();
gameSoundSuccess.src = "/week5/mp3/applaus.mp3";
gameSoundSuccess.volume = 0.4;
const clickSound = new Audio();
clickSound.src = "/week5/mp3/click.wav";
clickSound.volume = 0.4;
const btnSound = new Audio();
btnSound.src = "/week5/mp3/beep.wav";
btnSound.volume = 0.4;
const gameSoundMugungwha = new Audio();
gameSoundMugungwha.src = "/week5/mp3/mugungwha.mp3";
gameSoundMugungwha.volume = 0.4;
const gameSoundTiktok = new Audio();
gameSoundTiktok.src = "/week5/mp3/tiktok.mp3";
//gameSoundTiktok.volume = 0.6;
const gameSoundGun = new Audio();
gameSoundGun.src = "/week5/mp3/gun.mp3";
gameSoundGun.volume = 0.4;
const gameSoundFail = new Audio();
gameSoundFail.src = "/week5/mp3/nogod.mp3";
//gameSoundFail.volume = 0.6;
const gameSoundTruth = new Audio();
gameSoundTruth.src = "/week5/mp3/truth.mp3";
gameSoundTruth.volume = 0.4;

const BACKGROUND_WIDTH = 1440; // 배경화면 너비
const BACKGROUND_HEIGHT = 452; // 배경화면 높이
const ENDOFBACKGROUND = 740; // 배경화면 우측 끝
const TOPLIMITOFGORUND = 70; // 배경화면 놀이터 시작 라인
const CONTACTLENGTH = 20; // 닿았다고 판단하는 기준 거리
const TRAFFICLIGHT_PERIOD = 4000;
canvas.width = 700;
canvas.height = 452;

const gameSpeedOnGreen = 3; // 화면 상 맵의 이동 속도
const gameSpeedOnRed = 0; // 화면 상 맵의 이동 속도
let gameSpeed = gameSpeedOnGreen; // 화면 상 맵의 이동 속도
let redLight = false; // true인 경우 빨간 불
let bulletIntervalOnGreen = 500; // 총알 생성 속도
let bulletIntervalOnRed = TRAFFICLIGHT_PERIOD + 50; // 총알 생성 속도-시간 지연 땜에 오차 범위 더해줌
let bulletInterval = bulletIntervalOnGreen; // 총알 생성 속도
let tmpBulletInterval = bulletInterval; // 총알 생성 속도
let backgroundX = 0; // 백그라운드 이미지 x좌표 값
let totalTime = 31; // 총 게임 시간
let gameOver = false; // true인 경우 게임 오버
let gameSuccess = false; // true인 경우 스테이지 클리어
let scores = []; // 모든 점수를 저장하는 배열

let endLineX = 1350; // 결승선 x 좌표
let endLineY = 98; // 결승선 y 좌표
let endLineW = 15; // 결승선 너비
let endLineH = 354; // 결승선 높이
let bullets = []; // 모든 총알의 데이터
let timerInCalHP = null; // calculteHP 함수 쓰로틀링용 타이머

let trafficRedLight = "rgba(255, 0, 0, 0.300)";
let trafficOrangeLight = "rgba(255, 166, 0, 0.300)";
let trafficGreenLight = "greenyellow";

let arrOfInit = []; // init함수 반환 배열
const keyboards = []; // 유저 키보드 입력 값
const player = {
  // 플레이어 데이터
  x: 150,
  y: 200,
  width: 32,
  height: 48,
  frameX: 0,
  frameY: 0,
  speed: 5,
  health: 200,
  moving: false,
  damage: 70,
};

// 로컬에 저장되어 있는 점수 읽어서 저장
const savedScores = localStorage.getItem("scores");
if (savedScores !== null) {
  const parsedScores = JSON.parse(savedScores);
  scores = parsedScores;
}

// img 태그 생성 및 src 지정
const playerSprite = new Image();
playerSprite.src = "img/weddingguy03.png";
const background = new Image();
background.src = "img/background.jpeg";

// 총알 클래스
class Bullet {
  constructor(xpos, ypos, radius, color, speed, xdes, ydes) {
    this.xpos = xpos;
    this.xposTmp = xpos;
    this.ypos = ypos;
    this.yposTmp = ypos;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.xdes = xdes;
    this.ydes = ydes;

    this.dx = ((this.xpos - this.xdes) / getDistance(this.xpos, this.ypos, this.xdes, this.ydes)) * this.speed;
    this.dy = ((this.ypos - this.ydes - player.height / 2) / getDistance(this.xpos, this.ypos, this.xdes, this.ydes)) * this.speed;
  }

  draw(ctx) {
    ctx.beginPath();
    // 원 그리기
    ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false); // x,y,r,startAngle,endAngle,clockwise
    // 선 색상 설정
    ctx.strokeStyle = this.color;
    // 내부 색상 설정
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }

  update() {
    // 지속적으로 이동하게끔 포지션을 변경해줌. dx,dy는 변화량
    this.xpos -= this.dx;
    this.ypos -= this.dy;

    // clearRect 이후 빈 화면에 원을 다시 그려줌.
    this.draw(ctx);
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~ function declaration part ~~~~~~~~~~~~~~~~~~~~~~~~ */
// 화면 렌더링 업데이트 해주는 함수
function UpdateRendor() {
  // 화면 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 백그라운드 그리기
  ctx.drawImage(background, backgroundX, 0);
  // 결승선 그리기
  ctx.fillStyle = "whitesmoke";
  ctx.fillRect(endLineX, endLineY, endLineW, endLineH);
  // 신호등 그리기
  ctx.fillStyle = "#555";
  ctx.fillRect(275, 0, 150, 50);
  const redCircle = new Bullet(300, 23, 20, trafficRedLight, 0, 280, 10);
  redCircle.update();
  const orangeCircle = new Bullet(350, 23, 20, trafficOrangeLight, 0, 280, 10);
  orangeCircle.update();
  const greenCircle = new Bullet(400, 23, 20, trafficGreenLight, 0, 280, 10);
  greenCircle.update();

  // 캐릭터 그리기 (crop할 이미지의 좌표 + 화면상에 그릴 좌표)
  ctx.drawImage(
    playerSprite,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  );
  // 총알 그리기
  bullets.forEach((el) => {
    el.update();
  });
  // 캐릭터 체력 그리기
  ctx.fillStyle = "black";
  ctx.font = "bold 17px serif";
  ctx.fillText("HP:", 10, 28);
  ctx.fillStyle = "gray";
  ctx.fillRect(45, 10, 200, 25);
  ctx.fillStyle = "lightcoral";
  ctx.fillRect(45, 10, player.health, 25);

  // 화면 내 요소들 좌표 조정
  if (backgroundX > -ENDOFBACKGROUND) {
    backgroundX -= gameSpeed;
    player.x -= gameSpeed;
    endLineX -= gameSpeed;
  }
  handlePlayerMove();
  handlePlayerFrame();
  handleMovementOnRedAndGreen();
  calculateHealth();
  judgeWhetherSuccess();
  handleGameSuccess();
  handleGameOver();
}

// 신호등 출력하는 함수
function handleTrafficLight() {
  if (redLight) {
    redLight = false;
    trafficRedLight = "rgba(255, 0, 0, 0.300)";
    trafficGreenLight = "greenyellow";
    trafficOrangeLight = "rgba(255, 166, 0, 0.300)";
    scheduleMugungwha();
  } else {
    redLight = true;
    trafficRedLight = "red";
    trafficGreenLight = "rgba(0, 128, 0, 0.300)";
    trafficOrangeLight = "rgba(255, 166, 0, 0.300)";
  }
  scheduleOrangeLight();
}

// 주황불 스케줄 관리 함수
function scheduleOrangeLight() {
  setTimeout(function () {
    trafficOrangeLight = "orange";
  }, 3000);
}

// 무궁화 음성 스케줄 관리 함수
function scheduleMugungwha() {
  setTimeout(function () {
    gameSoundMugungwha.play();
  }, 1000);
}

// 키보드 입력에 따라 캐릭터를 조작하는 함수
function handlePlayerMove() {
  if (keyboards[38] && player.y > TOPLIMITOFGORUND) {
    // 위
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (keyboards[37] && player.x > 0) {
    // 좌
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (keyboards[40] && player.y < canvas.height - player.height) {
    // 아래
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keyboards[39] && player.x < canvas.width - player.width) {
    // 우
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
}

// 캐릭터의 움직임에 맞춰 프레임을 조절하는 함수
function handlePlayerFrame() {
  // frameX: 0~3 순환
  if (player.frameX < 3 && player.moving) {
    player.frameX++;
  } else {
    player.frameX = 0;
  }
}

// 빨간불과 초록불에 따라 요소들의 행동을 제어하는 함수
function handleMovementOnRedAndGreen() {
  if (redLight) {
    bulletInterval = bulletIntervalOnRed;
    gameSpeed = gameSpeedOnRed;
    bullets.forEach((el) => {
      el.dx = 0;
      el.dy = 0;
    });
  } else {
    bulletInterval = bulletIntervalOnGreen;
    gameSpeed = gameSpeedOnGreen;
    bullets.forEach((el) => {
      el.dx = ((el.xposTmp - el.xdes) / getDistance(el.xposTmp, el.yposTmp, el.xdes, el.ydes)) * el.speed;
      el.dy = ((el.yposTmp - el.ydes - player.height / 2) / getDistance(el.xposTmp, el.yposTmp, el.xdes, el.ydes)) * el.speed;
    });
  }
}

// HP 계산 하는 함수
function calculateHealth() {
  if (!timerInCalHP) {
    timerInCalHP = setTimeout(function () {
      timerInCalHP = null;
      bullets.forEach((el) => {
        if (getDistance(el.xpos, el.ypos, player.x + 20, player.y - 10 + player.height / 2) < CONTACTLENGTH) {
          console.log("heat");
          player.health -= player.damage;
          if (player.health < 0) player.health = 0;
        }
      });
    }, 300);
  }
}

// 미션 성공 여부 판단
function judgeWhetherSuccess() {
  // 캐릭터의 체력이 0 이하면 탈락
  if (player.health === 0) {
    gameOver = true;
  }
  // 빨간불일 때 움직이면 탈락
  if ((keyboards[37] || keyboards[38] || keyboards[39] || keyboards[40]) && redLight) {
    gameOver = true;
  }
  // 시간 내에 결승선 안에 진입? 성공 : 탈락
  if (endLineX < player.x) {
    gameSuccess = true;
  } else if (totalTime === 0) {
    gameOver = true;
  }
}

// 미션 성공 시 이벤트 발생 함수
function handleGameSuccess() {
  if (gameSuccess) {
    clearInterval(arrOfInit[0]);
    clearInterval(arrOfInit[1]);
    clearInterval(arrOfInit[2]);
    clearInterval(arrOfInit[3]);
    gameSoundMugungwha.pause();
    gameSoundTiktok.pause();
    gameSoundSuccess.play();
    let score = flushBelowNum((totalTime / 31) * 2500, 2);
    scores.push(score);
    saveScores(scores);
    successBtn.classList.remove("hidden");
  }
}

// 미션 실패 시 이벤트 발생 함수
function handleGameOver() {
  if (gameOver) {
    clearInterval(arrOfInit[0]);
    clearInterval(arrOfInit[1]);
    clearInterval(arrOfInit[2]);
    clearInterval(arrOfInit[3]);
    gameSoundMugungwha.pause();
    gameSoundTiktok.pause();
    gameSoundFail.play();
    setTimeout(function () {
      gameSoundGun.play();
    }, 6000);
    setTimeout(function () {
      gameSoundTruth.play();
    }, 7500);
    ctx.fillStyle = "black";
    ctx.font = "bold 70px serif";
    ctx.fillText("GAME OVER", 130, 150);
    failBtn.classList.remove("hidden");
  }
}

// 소수점 이하 버리는 함수
function flushBelowNum(value, num) {
  value = Math.round(value * Math.pow(10, num)) / Math.pow(10, num);
  return value;
}

// 총알 만드는 함수
function makeBullet() {
  const radius = 9;
  const random_x = 750;
  const random_y = getRandomNum(10, 490);
  const bulletColor = "rgb(70, 70, 70)";
  const bulletSpeed = 10;
  const myBullet = new Bullet(random_x, random_y, radius, bulletColor, bulletSpeed, player.x, player.y);
  bullets.push(myBullet);
  tIdMakeBullet = setTimeout(makeBullet, bulletInterval);
}

// 남은 시간을 출력하는 함수
function showTimeLeft() {
  if (totalTime > 0) {
    totalTime--;
    timeLeft.innerText = `You have ${totalTime}seconds to go.`;
  } else {
    timeLeft.innerText = `First Game Over`;
  }
  if (totalTime < 11) {
    timeLeft.classList.add("fontcolor_red");
    gameSoundTiktok.play();
  }
}

// 점과 점 사이의 거리 구하는 함수
function getDistance(xpos1, ypos1, xpos2, ypos2) {
  const result = Math.sqrt(Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2));
  return result;
}

// 랜덤 넘버 반환하는 함수
function getRandomNum(min, max) {
  let result = Math.random() * (max - min) + min;
  return result;
}

// 로컬에 스코어를 저장하는 함수
function saveScores(scores) {
  localStorage.setItem("scores", JSON.stringify(scores));
}

// 게임 시작 함수
function init() {
  // 유저 키보드 입력 감지 이벤트
  window.addEventListener("keydown", function (event) {
    keyboards[event.keyCode] = true;
  });
  window.addEventListener("keyup", function (event) {
    delete keyboards[event.keyCode];
    player.moving = false;
  });

  // 남은 시간 출력
  showTimeLeft();
  const tIdShowTimeLeft = setInterval(showTimeLeft, 1000);
  // 일정 시간 간격으로 총알 생성
  let tIdMakeBullet = setTimeout(makeBullet, bulletInterval);
  // 렌더링 업데이트
  const tIdUpdateRendor = setInterval(UpdateRendor, 50);
  // 신호등, 무궁화 출력
  scheduleMugungwha();
  scheduleOrangeLight();
  const tIdTrafficLight = setInterval(handleTrafficLight, TRAFFICLIGHT_PERIOD);

  return [tIdShowTimeLeft, tIdMakeBullet, tIdUpdateRendor, tIdTrafficLight];
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~ execution part ~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
startBtn.addEventListener("click", function (event) {
  arrOfInit = init();
  startBtn.classList.add("hidden");
  clickSound.play();
});
backBtn.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
gameBtn1.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
gameBtn2.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
gameBtn3.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
gameBtn4.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
