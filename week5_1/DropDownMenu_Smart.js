/* ~~~~~~~~~~~~~~~~~~~~~~~~ handling menu bar ~~~~~~~~~~~~~~~~~~~~~~~~ */
function handleMenuDisplay(event) {
  const menu = event.target.nextElementSibling;
  tIdMenu = setTimeout(() => {
    menu.classList.toggle("hide");
  }, DELAY_TIME_MENUBAR);
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

/* ~~~~~~~~~~~~~~~~~~~~~~~~ rendor mouse record ~~~~~~~~~~~~~~~~~~~~~~~~ */
function handleMouseRecord(event) {
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      rendorMouseRecord(event.target.textContent);
    }, DELAY_TIME_MOUSERECORD);
  }
}

function rendorMouseRecord(textContent) {
  const tag = document.querySelector(`.${textContent}`);
  if (tag === null) {
    insertHTMLMouseRecord(textContent);
  } else {
    const tagCnt = tag.nextElementSibling;
    tagCnt.textContent = Number(tagCnt.textContent) + 1;
  }
}

function insertHTMLMouseRecord(textContent) {
  const mouseRecord = document.querySelector("#mouse_movement_record");
  const innerHTML = `<div class="mouse-record">
                       <span class="${textContent}">${textContent}</span>
                       <span class="${textContent}_cnt">1</span>
                     </div>`;
  mouseRecord.insertAdjacentHTML("afterend", innerHTML);
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~ execution ~~~~~~~~~~~~~~~~~~~~~~~~ */
const DELAY_TIME_MENUBAR = 1000;
const DELAY_TIME_MOUSERECORD = 500;
let timer = null;

// get elements
const dropdown = document.querySelector(".dropdown_menu_smart");
const dropdownTitle = dropdown.querySelector(".title");
const dropdownList = dropdown.querySelectorAll(".option");

//bind listeners to elements above
dropdown.addEventListener("mouseleave", handleMenuHide);
dropdownTitle.addEventListener("mouseenter", handleMenuDisplay);
dropdownTitle.addEventListener("mouseleave", handleStopMenuDisplaySchedule);
dropdownList.forEach((element) => {
  element.addEventListener("mousemove", handleMouseRecord);
});

/* ~~~~~~~~~~~~~~~~~~~~~~~~ 코드 리뷰 내용 ~~~~~~~~~~~~~~~~~~~~~~~~ */
// insert html 하면 이벤트 리스너를 달아주기 힘들다 -> 이벤트 위임과 버블링으로 해결 가능하다
// 아니다 create랑 append로 하면 코드가 방대해진다
