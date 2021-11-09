// #1.

// recursive를 이용한 factorial
function factorial(n) {
    if ( n === 0 || n === 1)    return 1;
    else                        return n * factorial(n - 1);
}

// reduce를 이용한 factorial
function factorial(n) {
    if(n === 0) return 1;

    const arr = [];
        
    for(let i = 0; i < n; i++)
        arr.push(i + 1);
    
    const result = arr.reduce((prev, cur) => prev * cur);
    
    return result;
} 

// calculate 함수 구현
function calculate(n) {
    const arr = [];

    // 1 미만 함수 필터링
    if (n < 1) return 1;

    for (let i = 1; i <= n; i++)
        arr.push(factorial(i));

    console.log(arr);
    
    return arr;
}

calculate(6);