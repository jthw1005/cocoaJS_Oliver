/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  let final_result = "";
  let new_result = compareString(strs[0], strs[1]);
  for (let i = 1; i < strs.length - 1; i++) {
    new_result = compareString(new_result, strs[i + 1]);
    if (new_result.length > final_result.length) {
      final_result = new_result;
    }
  }
  return final_result;
};

function compareString(s1, s2) {
  let offset = 0;
  let idxStart = 0;
  for (let i = 0; i < s1.length; i++) {
    for (let j = 0; j < s2.length; j++) {
      let cnt = 0;
      if (s1[i] === s2[j]) {
        cnt++;
        let k = 1;
        while (s1[i + k] === s2[j + k]) {
          cnt++;
          k++;
          if (offset < cnt) {
            offset = cnt;
            idxStart = i;
          }
        }
      }
    }
  }

  const result = s1.slice(idxStart, idxStart + offset);
  return result;
}
