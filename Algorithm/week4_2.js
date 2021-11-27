/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  if (x < 0) {
    x *= -1;
    return -1 * reverse_inside(x);
  } else {
    return reverse_inside(x);
  }
};

function reverse_inside(x) {
  const arr = String(x).split("");
  const newArr = [];
  const len = arr.length;

  arr.forEach((el, idx) => {
    newArr[len - idx - 1] = el;
  });
  const result = +newArr.join("");
  return result;
}
