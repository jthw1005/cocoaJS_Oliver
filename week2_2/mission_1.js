const regExpForOpenBracket = /\[/m;
  const regExpForCloseBracket = /\]/m;
  const regExpForNumbers = /[0-9]/m;
  const data = "[11, 22, [3, 4, [555], 66]]";
  
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
  
  function extractNum(str, index) {
      let strNum = str[index];
      while(!isNaN(Number(str[index + 1]))) {
          strNum = strNum.concat('', str[index + 1]);
          index++;
      }
      return [strNum, index];
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
          const currentStack = stackPointer(numOfOpenBrackets - numOfCloseBrackets, stack);
  
          if(regExpForOpenBracket.test(str[index])) {
              pushInfo("array", "[", [], currentStack);
              numOfOpenBrackets++;
          }
          else if(regExpForCloseBracket.test(str[index])) {
              numOfCloseBrackets++;
          }
          else if(regExpForNumbers.test(str[index])) {
              const resultArr = extractNum(str, index);
              const strNum = resultArr[0];
              index = resultArr[1];
              pushInfo("number", strNum, [], currentStack);
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