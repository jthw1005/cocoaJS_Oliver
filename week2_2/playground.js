const regExpForOpenBracket = /\[/m;
const regExpForCloseBracket = /\]/m;
const regExpForNumbers = /[0-9]/m;
const regExpForComma = /\,/m;
const data = "[11, 22, [3, 4, [5]], 6]";

class ArrInfo {
    constructor(type, value, child) {
        this.type = type;
        this.value = value;
        this.child = child;
    }
};

function stackPointer(depthOfBracket, stack) {
    let currentStack = stack;
    for(let i = 0; i < depthOfBracket; i++)
        currentStack = currentStack.child[currentStack.child.length - 1];
    return currentStack;
}

function pushInfo(type, value, child, currentStack) {
    const newArrInfo = new ArrInfo(type, value, child);
    currentStack.child.push(newArrInfo);
}

/* Run */
function run(str) {
    // 변수 선언 파트
    let numOfOpenBrackets = 0;
    let numOfCloseBrackets = 0;
    let numOfElements = 0;
    const stack = {
        type: "root",
        child: [],
    };

    // 메인 함수 파트
    for(let index = 0; index < str.length; index++){
        let currentStack = stackPointer(numOfOpenBrackets - numOfCloseBrackets, stack);

        if(regExpForOpenBracket.test(str[index])) {
            pushInfo("array","[",[], currentStack);
            numOfOpenBrackets++;
        }
        else if(regExpForCloseBracket.test(str[index])) {
            numOfCloseBrackets++;
        }
        else if(regExpForNumbers.test(str[index])) {
            pushInfo("number",str[index],[], currentStack);
            numOfElements++;
        }
    }  

    // 결과 출력 파트
    if(numOfOpenBrackets !== numOfCloseBrackets)
        return console.log("괄호가 서로 매칭되지 않습니다.");
    else
        console.log(`배열의 중첩된 깊이 수준은 ${numOfOpenBrackets}이며, 총 ${numOfElements}개의 원소가 포함되어 있습니다.`);
    return stack;
}

/* execution part */
console.log(JSON.stringify(run(data),null,3));