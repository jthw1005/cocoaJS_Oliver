/* ~~~~~~~~~~~~~~~~~~~~~~~~ handling menu bar ~~~~~~~~~~~~~~~~~~~~~~~~ */
function handleMenuDisplay(event) {
  const menu = event.target.nextElementSibling;
  tIdMenu = setTimeout(() => {
    menu.classList.toggle("hide");
  }, DELAY_TIME);
}

function handleStopMenuDisplaySchedule() {
  clearTimeout(tIdMenu);
}

function handleMenuHide(event) {
  const menu = event.target.querySelector(".menu");
  if (!menu.classList.contains("hide")) {
    menu.classList.add("hide");
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~ handle record ~~~~~~~~~~~~~~~~~~~~~~~~ */
function handleMouseRecord(event) {
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      checkObjOverlap(event.target.innerText);
      rendorRecordArray(mouseRecordArr);
    }, 500);
  }
}

// 밑에 함수 다시 짜라 ㅡㅡ
function checkObjOverlap(innerText) {
  let flag = false;
  mouseRecordArr.forEach((element) => {
    if (element.innerText === innerText) {
      element.cnt++;
      flag = true;
    }
  });
  if (flag) {
    return mouseRecordArr;
  } else {
    createRecordObj(innerText);
  }
}

function createRecordObj(innerText) {
  const mouseRecordObj = {
    innerText: innerText,
    cnt: 0,
  };
  mouseRecordArr.push(mouseRecordObj);
  return mouseRecordArr;
}

// 이것도 템플릿 이용해서 다시 짜야함.
function rendorRecordArray(mouseRecordArr) {
  mouseRecordArr.forEach((element) => {
    const div = document.createElement("div");
    const spanInnerText = document.createElement("span");
    const spanCnt = document.createElement("span");
    div.appendChild(spanInnerText);
    div.appendChild(spanCnt);
    mouseRecord.appendChild(div);
    spanInnerText.innerText = element.innerText;
    spanCnt.innerText = element.cnt;
  });
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~ execution ~~~~~~~~~~~~~~~~~~~~~~~~ */
const DELAY_TIME = 1000;
const mouseRecordArr = [];
let tIdMenu = 0;
let tIdRecord = 0;
let timer = null;

// get elements
const dropdown = document.querySelector(".dropdown_menu_smart");
const dropdownTitle = dropdown.querySelector(".title");
const dropdownList = dropdown.querySelectorAll(".option");
const mouseRecord = document.querySelector("#mouse_movement_record");

//bind listeners to elements above
dropdown.addEventListener("mouseleave", handleMenuHide);
dropdownTitle.addEventListener("mouseenter", handleMenuDisplay);
dropdownTitle.addEventListener("mouseleave", handleStopMenuDisplaySchedule);
dropdownList.forEach((element) => {
  element.addEventListener("mousemove", handleMouseRecord);
});
