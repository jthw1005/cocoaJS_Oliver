//reduce를 이용한 팩토리얼

function factorial(n) {
    const arr = [];

    if(n === 0) return 1;

    for(let i = 0; i < n; i++)
        arr.push(i + 1);
    
    const result = arr.reduce((prev, cur) => prev * cur);
    
    return result;
} 

function calculate(n) {
    const arr = [];

    // 1 미만 함수 필터링
    if (n < 1) return 1;

    for (let i = 1; i <= n; i++)
        arr.push(factorial(i));

    console.log(arr);
    
    return arr;
}

console.log(factorial(0));