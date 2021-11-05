// #1.

function factorial(n) {
    if ( n === 0 || n === 1)    return 1;
    else                        return n * factorial(n - 1);
}

function calculate(n) {
    const arr = [];

    for (let i = 1; i <= n; i++)
        arr.push(factorial(i));

    console.log(arr);
    
    return arr;
}

calculate(6);