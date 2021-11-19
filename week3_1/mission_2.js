/* ver. call back hell */
/*
[ ] call back -> make it outside func.
[ ] need to make an exception func deal with other input but Y / N.
*/

const MyStatistics = require("./mission_1");
const finalScoreResult = [];
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let studentName = "";

function stringToNum(data) {
  if (data.isArray()) {
    arr.forEach((el, idx) => {
      arr[idx] = Number(el);
    });
  } else if (typeof data === "string") {
    data = Number(data);
  } else {
    console.log("Unknown type");
  }
  return data;
}

rl.question("Your Name? \n", (userName) => {
  studentName = userName;
  rl.question("Name of the Subject? \n", (userSubject) => {
    rl.question(`List Score of your ${userSubject}. \n`, (userScore) => {
      const arrOfScore = stringToNum(userScore.split(" "));
      const userStatistic = new MyStatistics(arrOfScore);
      const userScoreData = {
        subject: userSubject,
        mean: userStatistic.getMean(),
        dispersion: userStatistic.getDispersion(),
        standardDeviation: userStatistic.getStandardDeviation(),
      };
      finalScoreResult.push(userScoreData);
      rl.close();
    });
  });
});

rl.on("close", () => {
  const userTpl = `
    # User Name: ${studentName}
    # User Statistic: ${finalScoreResult}
`;
  console.log(studentName);
  console.table(finalScoreResult[0]);
});
