// #3.

// 주어진 점수 리스트
const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];
const adder = (previousValue, currentValue) => previousValue + currentValue;

function average(grades) {
    // 각 학생들의 평균 점수    
    for(let i = 0; i < grades.length; i++)
        console.log(`학생 ${i}의 평균 점수: ` + (grades[i].reduce(adder) / 3).toFixed(1));

    // 최고점수의 평균 점수
    let avgMax = 0;

    for (let i = 0; i < grades.length; i++)
        avgMax += Math.max(...grades[i]);

    console.log(`최고 점수의 평균점수: ${avgMax / 4}`);
}

average(grades);