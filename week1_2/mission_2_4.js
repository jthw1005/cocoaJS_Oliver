// #4.

// 주어진 데이터
const data = {
    "debug": "on",
    "window": {
        "title": "Sample Konfabulator Widget",
        "name": "main_window",
        "width": 500,
        "height": 500
    },
    "image": { 
        "src": "Images/Sun.png",
        "name": "sun1",
        "hOffset": 250,
        "vOffset": 250,
        "alignment": "center"
    },
    "text": {
        "data": "Click Here",
        "size": 36,
        "style": "bold",
        "name": "text1",
        "hOffset": 250,
        "vOffset": 100,
        "alignment": "center",
        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
};

function filterNum(data) {
    const ansArr = [];

    for (const keyDepth_1 in data) 
        for (const keyDepth_2 in data[keyDepth_1]) 
            if (typeof(data[keyDepth_1][keyDepth_2]) === 'number')
            ansArr.push(keyDepth_2);
    
    return ansArr;
}

console.log(filterNum(data));


// Q1. for문 두 번 안 돌고 한 번에 찾을 수 있는 방법은 없나??

// // Q2. 왜 o과 n이 찢어지지?
// const data1 = {
//     "debug": "on"
// };

// function doSomething(data1) {
//     for (const keyDepth_1 in data1) 
//         for (const keyDepth_2 in data1[keyDepth_1]) {
//                 console.log(keyDepth_2);
//                 console.log(data1[keyDepth_1][keyDepth_2]);
//         }
//     }
// doSomething(data1);