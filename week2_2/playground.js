/*
# 과제
아래와 같은 배열 모양의 문자열을 파싱한다.
이 때, 모든 숫자는 '[]'에 의해 감싸져 있다.
const data = "[1,2,[3,4,[5,[6]]]]"

# 과제 조건
0. 객체 분석 정보를 출력한다.(깊이, 원소 개수)
ex) "배열의 중첩된 깊이 수준은 4이며, 총 6개의 원소가 포함되어 있습니다."
1. 괄호의 짝이 맞지 않는 경우 오류내용을 출력한다.
ex) "닫는 괄호가 일치하지 않습니다."
2. 배열 분석 정보를 출력한다.
ex)
const data = "[1,2,[3,4,[5,[6]]]]";
run(data) >
  {
    type: "root",
    child: [
      {
        type: "array",
        child: [
          {
            type: "number",
            value: "1",
            child: [],
          },
          {
            type: "array",
            child: [
              {
                type: "number",
                value: "2",
                child: [],
              },
              {
                type: "array",
                child: [
                  {
                    type: "number",
                    value: "3",
                    child: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

# 힌트
0. 문제를 단순화하여 해결해본다.
1. 무한 중첩된 해법이 어렵다면, 특정한 배열문자열 형태를 처리하는 로직을 개발한다.
2. 문자열을 iteration하며 의미 있는 토큰을 추출하고 이를 분석한다.
3. 무한한 형태를 파싱할 때는, 데이터 파싱을 하는 단계에서, stack 자료 구조를 활용할 수 있다.
ex) '['을 찾은 후에 ']'를 찾을 때까지 스택자료구조를 활용하여 데이터를 모은다.

# 학습 포인트
0. 문자열을 반복문을 이용하여 파싱하는 방법을 안다.
1. 정규표현식이 무엇인지 안다.
2. stack과 queue의 차이점과 활용점을 안다.
3. 무한중첩된 구조를 재귀와 스택 자료구조를 활용하여 분석할 수 있다.

# 코드 설계
0. 먼저 open bracket이랑 close bracket 개수 같은지 판단해서 같지 않으면 가차없이 error랑 return 1
1. 개수가 같으면 '['의 개수 = 깊이, comma개수 = 개수
2. type, child, value를 받는 생성자 만들어서 재귀함수에 집어 넣으면?
3. 스택 끝날 때까지 재귀함수 돌리셈.
*/

    const regExpForOpenBracket = /\[/m;
    const regExpForCloseBracket = /\]/m;
    const regExpForNumbers = /[0-9]/m;
    const regExpForComma = /\,/m;
    const data = "[1,2,[3,4,[5,[6]]]]"
    
    /* Run */
    const run = function(str) {
    
        function InfoOfArr(type, value, child) {
            this.type = type;
            this.value = value;
            this.child = child;
        }

        let numOfOpenBracket = 0;
        let numOfCloseBracket = 0;
        let numOfComma = 0;
        //let numOf = 0;
    
        for(let index = 0; index < str.length; index++ ){
            console.log(index);
            console.log(str[index]);

            if(regExpForOpenBracket.test(str[index])) {
                console.log("[");
                numOfOpenBracket++;

            }
            else if(regExpForCloseBracket.test(str[index])) {
                console.log("]");
                numOfCloseBracket++;
            }
            else if(regExpForNumbers.test(str[index])) {
                console.log("n");
            }
            else if(regExpForComma.test(str[index])){
                console.log(",");
                numOfComma++;
            }
            else {
                console.log("엥?"+ "}");
            }
        }  
        
        if(numOfOpenBracket !== numOfCloseBracket) {
            console.log("괄호가 서로 매칭되지 않습니다.");
            return 1;
        }
        else {
            console.log(`배열의 중첩된 깊이 수준은 ${numOfOpenBracket}이며, 총 ${numOfComma + 1}개의 원소가 포함되어 있습니다.`);
        }
    }
    

    /* Stack */
    const Stack = function() {
        this.elements = {};
    }

    Stack.prototype.push = function(element) {
        this.elements
    }

    run(data);