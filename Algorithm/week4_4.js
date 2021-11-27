/**
 * @param {string} s
 * @return {number}
 */

var romanToInt = function (s) {
  const arr = s.split("");
  arr.forEach((el, idx) => {
    switch (el) {
      case "I":
        arr[idx] = 1;
        break;
      case "V":
        arr[idx] = 5;
        break;
      case "X":
        arr[idx] = 10;
        break;
      case "L":
        arr[idx] = 50;
        break;
      case "C":
        arr[idx] = 100;
        break;
      case "D":
        arr[idx] = 500;
        break;
      case "M":
        arr[idx] = 1000;
        break;
      default:
        console.log("uh?");
    }
  });

  arr.forEach((el, idx) => {
    if (arr[idx] < arr[idx + 1]) {
      arr[idx] = -arr[idx];
    }
  });
  let sum = arr.reduce((prev, curr) => prev + curr);
  return sum;
};
