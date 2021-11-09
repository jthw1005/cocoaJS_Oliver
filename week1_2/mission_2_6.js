// #6.
// myReduce 구현

const myReduce = (arr, callback, initialValue) => {
    // initialValue가 없으면 배열의 첫번째 요소가 초기값이 됨.
    if(initialValue === undefined)
        initialValue = arr[0];

    for(let i = 0; i < arr.length; i++)
        initialValue = callback(arr[i], initialValue);

    return initialValue;
}

// ex - 성인인 사람 리스트 구하기
let userList = [
    { name: "mike", age: 30 },
    { name: "tom", age: 10 },
    { name: "jane", age: 27 },
    { name: "sue", age: 26 },
    { name: "harry", age: 42 },
    { name: "steve", age: 6 },
];

const result = myReduce(userList, (next, prev) => {
    if(next.age > 19)
        prev.push(next.name);

    return prev;
}, []);

console.log(result);