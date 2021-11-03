// string to array
function strToArr(str) {
    const arr = str.split('');      // 문자열 str의 글자를 하나씩 나눠서 배열로 저장

    console.log(arr);               // 해당 배열을 출력
}

// base conversion
function baseConversion(radix, num) {
    let result = "";

    for (let i = 0; i < num; i++)
        result = result.concat(i.toString(radix));      // 진법 변환 후 모든 숫자들을 하나의 문자열에 저장

    return result;
}

// chulsoo
function chulsooYanolja(n_list, n_People, p) {
    const chulsooList = [];

    for (let i = 0; n_People * i + p <= n_list.length; i++)
        chulsooList.push(n_list[n_People * i + p - 1])      // 등차수열로 철수 순서에 해당하는 요소들을 배열에 넣기

    console.log(chulsooList);
}

// solution func
function solution(radix, n_Num, n_People, p) {
    const n_list = baseConversion(radix, n_Num * n_People);

    strToArr(n_list);

    chulsooYanolja(n_list, n_People, p);
}

solution(2, 3, 4, 2);