/* */

var recursiveAsyncReadLine = function () {
  rl.question("Is there more? (Y / N) \n", (userResponse) => {
    if (userResponse == "N") {
      return rl.close();
    } else {
      console.log('Got it! Your answer was: "', userResponse, '"');

      recursiveAsyncReadLine();
    }
  });

  rl.on("close", printResultOfStatistic(studentName, finalScoreResult));
};

recursiveAsyncReadLine();
