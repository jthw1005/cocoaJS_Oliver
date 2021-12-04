const pickCharacterBtn1 = document.querySelector("#btn1");
const pickCharacterBtn2 = document.querySelector("#btn2");
const pickCharacterBtn3 = document.querySelector("#btn3");
const pickCharacterBtn4 = document.querySelector("#btn4");
const pickCharacterBtnBack = document.querySelector("#btn_back");

const btnSound = new Audio();
btnSound.src = "/week5/mp3/beep.wav";
btnSound.volume = 0.4;
const character = new Audio();
character.src = "/week5/mp3/character.mp3";
character.volume = 0.6;
character.play();

pickCharacterBtn1.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
pickCharacterBtn2.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
pickCharacterBtn3.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
pickCharacterBtn4.addEventListener("mouseenter", function (event) {
  btnSound.play();
});
pickCharacterBtnBack.addEventListener("mouseenter", function (event) {
  btnSound.play();
});

// pickCharacterBtn1.addEventListener("click", function (event) {
//   export const player = "kihun";
// });
// pickCharacterBtn2.addEventListener("click", function (event) {
//   export const player = "ilnam";
// });
// pickCharacterBtn3.addEventListener("click", function (event) {
//   export const player = "saebyuk";
// });
// pickCharacterBtn4.addEventListener("click", function (event) {
//   export const player = "ali";
// });
