const menuBtn1 = document.querySelector("#btn1");
const menuBtn2 = document.querySelector("#btn2");
const menuBtn3 = document.querySelector("#btn3");

const bgSound = new Audio();
bgSound.src = "/week5/mp3/bgm.mp3";
bgSound.play();
const btnSound = new Audio();
btnSound.src = "/week5/mp3/beep.wav";
btnSound.volume = 0.4;

menuBtn1.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
menuBtn2.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
menuBtn3.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
