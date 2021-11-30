let canvas = document.querySelector("#canvas");

let context = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#edf";

// /* ~~~~~~~~~~~~~~~~~~~~~~~~ drawing square ~~~~~~~~~~~~~~~~~~~~~~~~ */
// context.fillRect(300, 10, 100, 200); // x,y,w,h
// context.fillStyle = "red";
// context.fillRect(100, 500, 200, 200);

// /* ~~~~~~~~~~~~~~~~~~~~~~~~ drawing circle ~~~~~~~~~~~~~~~~~~~~~~~~ */
// context.beginPath();
// context.strokeStyle = "blue";
// context.lineWidth = 20;
// context.arc(100, 100, 80, 0, Math.PI * 2, false); // x,y,r,startAngle,endAngle,clockwise
// context.stroke();
// context.closePath();

/* ~~~~~~~~~~~~~~~~~~~~~~~~ drawing 10 random circle ~~~~~~~~~~~~~~~~~~~~~~~~ */
class Circle {
  constructor(xpos, ypos, radius, color, text, linewidth, speed) {
    this.xpos = xpos;
    this.ypos = ypos;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;
    this.lineWidth = linewidth;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();
    // 색상 지정
    context.strokeStyle = this.color;
    // 텍스트 정렬 및 폰트 설정
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    // 텍스트 그리기
    context.fillText(this.text, this.xpos, this.ypos);

    // 선 굵기 설정
    context.lineWidth = this.linewidth;
    // 원 그리기
    context.arc(this.xpos, this.ypos, this.radius, 0, Math.PI * 2, false); // x,y,r,startAngle,endAngle,clockwise
    context.stroke();
    context.closePath();
  }

  update() {
    // 벽면에 부딪히면 튕기는 코드.
    // if (this.xpos + this.radius > window_width) {
    //   this.dx = -this.dx;
    // }
    // if (this.xpos - this.radius < 0) {
    //   this.dx = -this.dx;
    // }
    // if (this.ypos + this.radius > window_height) {
    //   this.dy = -this.dy;
    // }
    // if (this.ypos - this.radius < 0) {
    //   this.dy = -this.dy;
    // }

    // 지속적으로 이동하게끔 포지션을 변경해줌. dx,dy는 변화량
    this.xpos += this.dx;
    this.ypos += this.dy;

    // clearRect 이후 빈 화면에 원을 다시 그려줌.
    this.draw(context);
  }
}

// 원과 원 사이의 거리 구하기
let getDistance = function (xpos1, ypos1, xpos2, ypos2) {
  const result = Math.sqrt(Math.pow(xpos2 - xpos1, 2) + Math.pow(ypos2 - ypos1, 2));
  return result;
};

/* ~~~~~~~~~~~~~~~~~~~~~~~~ execution part ~~~~~~~~~~~~~~~~~~~~~~~~ */
// x,y의 좌표를 랜덤 생성함.

const bullets = [];

function randomNum(min, max) {
  let result = Math.random() * (max - min) + min;
  return result;
}

for (let i = 0; i < 20; i++) {
  let radius = 10;
  let random_x = randomNum(radius, window_width - radius);
  let random_y = randomNum(radius, window_height - radius);

  let myCircle = new Circle(random_x, random_y, radius, "black", "A", 2, 5);
  bullets.push(myCircle);
}

setInterval(function () {
  // 아래 구문이 없으면 새로운 원이 생길 때 기존 원이 사라지지 않아서 그림이 겹침.
  context.clearRect(0, 0, window_width, window_height);

  bullets.forEach((el) => {
    el.update();
  });
}, 50);
