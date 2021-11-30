const timeLeft = document.querySelector(".time_left");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

const BACKGROUND_WIDTH = 1440;
const BACKGROUND_HEIGHT = 452;
const ENDOFBACKGROUND = 740;
const TOPLIMITOFGORUND = 70;
const CONTACTLENGTH = 30;
canvas.width = 700;
canvas.height = BACKGROUND_HEIGHT;

let gameSpeed = 5;
let backgroundX = 0;
let totalTime = 10;
let gameOver = false;
let gameSuccess = false;

let endLineX = 1350;
let endLineY = 98;
let endLineW = 15;
let endLineH = 354;

const bullets = [];
const keyboards = [];
const player = {
  x: 150,
  y: 200,
  width: 32,
  height: 48,
  frameX: 0,
  frameY: 0,
  speed: 20,
  health: 100,
  moving: false,
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~ code related to Circle ~~~~~~~~~~~~~~~~~~~~~~~~~~ */
class Bullet {
  constructor(xpos, ypos, radius, color, linewidth, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
    this.speed = speed;
    this.lineWidth = linewidth;

    // 캐릭터를 향하게끔 수정해야함. 코사인 사인 이용해서!
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(ctx) {
    ctx.beginPath();
    // 원 그리기
    ctx.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false); // x,y,r,startAngle,endAngle,clockwise
    // 선 굵기 설정
    ctx.lineWidth = this.linewidth;
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
    //this.ypos -= this.dy;

    // clearRect 이후 빈 화면에 원을 다시 그려줌.
    this.draw(ctx);
  }
}

// 점과 점 사이의 거리 구하기
let getDistance = function (xpos1, ypos1, xpos2, ypos2) {
  const result = Math.sqrt(Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2));
  return result;
};

// 랜덤 숫자 구하기
function randomNum(min, max) {
  let result = Math.random() * (max - min) + min;
  return result;
}

// 총알 만들기
setInterval(function () {
  let radius = 10;
  let random_x = 800;
  let random_y = randomNum(radius, 700 - radius);
  const bulletspeed = 20;
  let myCircle = new Bullet(random_x, random_y, radius, "gray", 2, bulletspeed);
  bullets.push(myCircle);
}, 400);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~ 배경이미지 & 캐릭터 그리기 ~~~~~~~~~~~~~~~~~~~~~~~~~~ */
// 아래 코드는 createelement + appendchild와 같다.
const playerSprite = new Image();
playerSprite.src = "img/weddingguy03.png";
const background = new Image();
background.src = "img/background.jpeg";

// s: crop할 이미지의 좌표, d: 화면상에 그릴 좌표
function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

// 애니메이션 효과를 위한 update함수 설정
setInterval(function () {
  // 화면 초기화
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 백그라운드 그리기
  ctx.drawImage(background, backgroundX, 0);

  // 결승선 그리기
  ctx.fillStyle = "whitesmoke";
  ctx.fillRect(endLineX, endLineY, endLineW, endLineH); // x,y,w,h

  // 총알 그리기
  bullets.forEach((el) => {
    el.update();
  });

  // 화면 이동 속도 조절
  if (backgroundX <= -ENDOFBACKGROUND) {
  } else {
    backgroundX -= gameSpeed;
    player.x -= gameSpeed;
    endLineX -= gameSpeed;
  }

  drawSprite(
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
  judgeWhetherSuccess();
  handlePlayerMove();
  handlePlayerFrame();

  handleGameSuccess();
  handleGameOver();
}, 50);

function handlePlayerMove() {
  if (keyboards[38] && player.y > TOPLIMITOFGORUND) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (keyboards[37] && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (keyboards[40] && player.y < canvas.height - player.height) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
  if (keyboards[39] && player.x < canvas.width - player.width) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
}

function handlePlayerFrame() {
  // frameX: 0~3 순환
  if (player.frameX < 3 && player.moving) {
    player.frameX++;
  } else {
    player.frameX = 0;
  }
}

// 미션 성공 여부 판단
function judgeWhetherSuccess() {
  // 총알에 맞으면 실패
  bullets.forEach((el) => {
    if (getDistance(el.xpos, el.ypos, player.x, player.y + player.height / 2) < CONTACTLENGTH) {
      gameOver = true;
      console.log("fail");
    }
  });

  // 시간 내에 결승선 안에 진입? 성공 : 탈락
  if (endLineX - player.x < CONTACTLENGTH) {
    gameSuccess = true;
  } else if (totalTime < 0) {
    gameOver = true;
  }
}

// 디바운싱으로 한 번만 실행되게끔 수정해야함.
function handleGameSuccess() {
  if (gameSuccess) {
    //console.log("첫 번째 미션에서 살아남으셨습니다.");
    gameSuccess = false;
  }
}

function handleGameOver() {
  if (gameOver) {
    //console.log("fail");
    gameOver = false;
  }
}

window.addEventListener("keydown", function (event) {
  keyboards[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
  delete keyboards[event.keyCode];
  player.moving = false;
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~ 남은 시간 표현 코드 ~~~~~~~~~~~~~~~~~~~~~~~~~~ */
function showTimeLeft() {
  if (totalTime >= 0) {
    timeLeft.innerText = `첫 번째 미션 종료까지 ${totalTime}초 남았습니다.`;
    totalTime--;
  } else {
    timeLeft.innerText = `첫 번째 미션이 종료되었습니다.`;
  }
}
showTimeLeft();
setInterval(showTimeLeft, 1000);
