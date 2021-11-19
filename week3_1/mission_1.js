/* 
[ ] getAreaOfSRD랑 getScoreProbability 오버라이딩으로 하나의 함수로 합칠 것
[v] 실행파트에서 template literal 이용해서 출력하는 걸로 바꿀 것
*/

const standardNormalDistributionTable = require("./source.js");

class MyStatistics {
  constructor(data) {
    this.data = data;
  }

  flushBelowNum(value, num) {
    value = Math.round(value * Math.pow(10, num)) / Math.pow(10, num);
    return value;
  }

  getMean() {
    const result = this.flushBelowNum(this.data.reduce((prev, curr) => prev + curr) / this.data.length, 2);
    return result;
  }

  getDispersion() {
    const mean = this.getMean();
    const result = this.flushBelowNum(this.data.reduce((prev, curr) => prev + Math.pow(curr - mean, 2), 0) / this.data.length, 2);
    return result;
  }

  getStandardDeviation() {
    const result = this.flushBelowNum(Math.sqrt(this.getDispersion()), 2);
    return result;
  }

  transformToSND(value) {
    const Z = this.flushBelowNum((value - this.getMean()) / this.getStandardDeviation(), 2);
    return Z;
  }

  getAreaOfSRD(Z) {
    let isZPlus = Z < 0 ? false : true;
    let result = 0;

    Z = Math.abs(Z);
    const row = Math.floor(Z * 10);
    const col = Math.floor((Z * 100) % 10);
    const probability = standardNormalDistributionTable[row][col];

    if (isZPlus) result = this.flushBelowNum(probability, 4);
    else result = this.flushBelowNum(1 - probability, 4);
    return result;
  }

  getScoreProbability(lower, upper) {
    const ZofLower = this.transformToSND(lower);
    const ZofUpper = this.transformToSND(upper);
    const probability = this.getAreaOfSRD(ZofUpper) - this.getAreaOfSRD(ZofLower);
    return this.flushBelowNum(probability, 4);
  }
}

module.exports = MyStatistics;

/* Execution part */
// const data = [
//   89.23, 82.03, 71.56, 78.82, 85.05, 84.44, 67.53, 71.7, 77.97, 73.77, 84.25, 67.01, 73.78, 64.19, 89.89, 90.32, 73.21, 75.35, 83.22, 74.01,
// ];

// const StatisticOfClassA = new MyStatistics(data);

// const tpl = `
//     # A반의 평균             ${StatisticOfClassA.getMean()}
//     # A반의 분산             ${StatisticOfClassA.getDispersion()}
//     # A반의 표준편차          ${StatisticOfClassA.getStandardDeviation()}
//     # 70점 정규분포화 후 Z값   ${StatisticOfClassA.transformToSND(70)}
//     # 80점 정규분포화 후 Z값   ${StatisticOfClassA.transformToSND(80)}
//     # 한 학생이 0~70점일 확률  ${StatisticOfClassA.getAreaOfSRD(StatisticOfClassA.transformToSND(70))}
//     # 한 학생이 0~80점일 확률  ${StatisticOfClassA.getAreaOfSRD(StatisticOfClassA.transformToSND(80))}
//     # 한 학생이 70~80점일 확률 ${StatisticOfClassA.getScoreProbability(70, 80)}
// `;
// console.log(tpl);
