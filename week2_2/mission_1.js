const regExpForOpenBracket = /\[/m;
  const regExpForCloseBracket = /\]/m;
  const regExpForNumbers = /[0-9]/m;
  const regExpForComma = /\,/m;
  const data = "[1, 2, [3]]"
  
  class ArrInfo {
      constructor(type, value, child) {
          this.type = type;
          this.value = value;
          this.child = child;
      }
  };
  
  
  function stackPointer(depthOfBracket) {
      let currentStack = stack;
      for(let i = 0; i < depthOfBracket; i++) {
          currentStack = currentStack.child[currentStack.child.length - 1];
      }
      return currentStack;
  }
  
  
  /* Run */
  function run(str) {
  
      const stack = {
          type: "root",
          child: [],
      };
      let numOfOpenBracket = 0;
      let numOfCloseBracket = 0;
      let numOfComma = 0;
      let currentStack = stack;
  
  
      for(let index = 0; index < str.length; index++){
  
          if(regExpForOpenBracket.test(str[index])) {
              numOfOpenBracket++;
              const newArrInfo = new ArrInfo("array","[",[])
              currentStack.child.push(newArrInfo);
  
              currentStack = currentStack.child[currentStack.child.length - 1];
          }
  
          else if(regExpForCloseBracket.test(str[index])) {
              numOfCloseBracket++;
  
          }
  
          else if(regExpForNumbers.test(str[index])) {
              const newArrInfo = new ArrInfo("number",str[index],[])
              currentStack.child.push(newArrInfo);
          }
  
          else if(regExpForComma.test(str[index])){
              numOfComma++;
          }
  
          else {
              console.log("Error");
          }
      }  
      
  
      if(numOfOpenBracket !== numOfCloseBracket) {
          console.log("괄호가 서로 매칭되지 않습니다.");
          return 1;
      }
      else {
          console.log(`배열의 중첩된 깊이 수준은 ${numOfOpenBracket}이며, 총 ${numOfComma + 1}개의 원소가 포함되어 있습니다.`);
      }
  
      return stack;
  }
  
  
  /* execution part */
  
  console.log(JSON.stringify(run(data),null,3));