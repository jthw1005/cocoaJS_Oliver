const scoreBoardBtn1 = document.querySelector("#btn1");
const scoreTable = document.querySelector(".scoreBoard_table");
const btnSound = new Audio();

btnSound.src = "/week5/mp3/beep.wav";
btnSound.volume = 0.4;

scoreBoardBtn1.addEventListener("mouseenter", function (event) {
  btnSound.play();
});

const savedScores = localStorage.getItem("scores");
if (savedScores !== null) {
  const parsedScores = JSON.parse(savedScores);

  for (let i = 0; i < parsedScores.length; i++) {
    const innerHTML = `
  <div class="scoreBoard_list">
  <span class="scoreBoard_list_text">trial ${i + 1}</span>
  <span class="scoreBoard_list_text">${parsedScores[i]}</span>
  </div>
  `;

    scoreTable.insertAdjacentHTML("beforeend", innerHTML);
  }
}
