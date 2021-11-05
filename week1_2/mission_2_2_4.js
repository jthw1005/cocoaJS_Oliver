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
    const arrAns = [];

    for (const keyDepth_1 in data) 
        for (const keyDepth_2 in data[keyDepth_1]) 
            if (typeof(data[keyDepth_1][keyDepth_2]) === 'number')
                arrAns.push(keyDepth_2);
    
    return arrAns;
}

console.log(filterNum(data));

// // Q. 왜why??
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