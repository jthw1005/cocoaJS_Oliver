// regualr expressions 설정
const regExp = /[^0-9a-zA-Z]/g;
// 주어진 List
const peoples = ["crong!@#", "3honux5", "sarah#", "hea3d", "zello", "5lucas"];

//==========================================================================================================================
// #2. w for, while
{
    function filterId(list) {    
        // 특수 기호 포함 요소 제거
        for (let i = 0; i < list.length; i++) {
            if (regExp.test(list[i])) {
                list.splice(i, 1);
                i--;
            }
        }
    
        // 요소 내 숫자 제거
        for (let i = 0; i < list.length; i++)
            list[i] = list[i].replace(/[0-9]/g, "");

        // 결과 출력
        console.log(list);
        return list;
    }
    
    filterId(peoples);
}


//==========================================================================================================================
// #2. w/o for, while
{
function checkSpChar(str) {
    if(regExp.test(str))    return false; 
    else                    return true; 
}

function filterId(list) {
    // 특수 문자 포함 요소 제거
    list = list.filter(checkSpChar);
    
    // 요소 내 숫자 제거
    list.forEach((element, index) => list[index] = element.replace(/[0-9]/g, ""));
    
    // 결과 출력
    console.log(list);
    return list;
}

filterId(peoples);
}


//==========================================================================================================================
// // Q. 1과 2 왜 결과가 다르지?
// const peoples = [ "honux5", "hea3d", "5lucas"];
// // 1
// peoples.forEach((element, index) => element = element.replace(/[0-9]/g, ""));
// console.log(peoples);
// // 2
// peoples.forEach((element, index) => peoples[index] = element.replace(/[0-9]/g, ""));
// console.log(peoples);