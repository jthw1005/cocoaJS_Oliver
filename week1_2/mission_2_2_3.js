// #3.

const grades = [[88,76,77], [33,44,44], [90,100,94], [30,44,98]];

function average(grades) {
    // 각 학생들의 평균 점수
    const avg = [];
    
    for (let i = 0; i < grades.length; i++) {
        let sum = 0;

        for (let j = 0; j < grades[i].length; j++)
            sum += grades[i][j];

        avg.push(sum / 3);
    }

    console.log(`각 학생들의 평균점수: ${avg}`);

    // 최고점수의 평균 점수
    let avgMax = 0;

    for (let i = 0; i < grades.length; i++) {
        let max = 0;

        for (let j = 0; j < grades[i].length; j++)
            max = (max < grades[i][j]) ? grades[i][j] : max;

        avgMax += max;
    }

    avgMax /= 4;

    console.log(`최고 점수의 평균점수: ${avgMax}`);
}

average(grades);