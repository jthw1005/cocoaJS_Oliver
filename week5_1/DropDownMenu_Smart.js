/* ~~~~~~~~~~~~~~~~~~~~~~~~ handling menu bar ~~~~~~~~~~~~~~~~~~~~~~~~ */
function handleMenuDisplay() {
  const menu = arguments[1].target.nextElementSibling;
  tIdMenu = setTimeout(() => {
    menu.classList.toggle("hide");
  }, arguments[0]);
}

/*
argument를 쓰는 경우 저게 뭘 의미하는지 파악하기 힘들기 때문에 의미 있는 변수에 할당해주고 해당 변수를 써야함.
*/

function handleTerminateSchedule() {
  clearTimeout(tIdMenu);
}

function handleMenuHide(event) {
  const menu = event.target.querySelector(".menu");
  if (!menu.classList.contains("hide")) {
    menu.classList.add("hide");
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~ handle record ~~~~~~~~~~~~~~~~~~~~~~~~ */
function handleRecordMouse(event) {
  x = event.screenX;
  y = event.screenY;
}

function handlePrintRecord() {
  tIdRecord = setInterval(() => {
    console.log(x, y);
  }, 1000);
}

function handleTerminatePrint() {
  clearInterval(tIdRecord);
}

function getMousePosition(x, y) {}
/* ~~~~~~~~~~~~~~~~~~~~~~~~ execution ~~~~~~~~~~~~~~~~~~~~~~~~ */
const DELAY_TIME = 1000;
let tIdMenu = 0;
let tIdRecord = 0;
let x = 0;
let y = 0;

// get elements
const dropdown = document.querySelector(".dropdown_menu_smart");
const dropdownTitle = dropdown.querySelector(".title");
const dropdownMenu = dropdown.querySelector(".menu");

//bind listeners to elements above
dropdown.addEventListener("mouseleave", handleMenuHide);
dropdownTitle.addEventListener("mouseenter", handleMenuDisplay.bind(event, DELAY_TIME));
dropdownTitle.addEventListener("mouseleave", handleTerminateSchedule);

dropdownMenu.addEventListener("mousemove", handleRecordMouse);
dropdownMenu.addEventListener("mouseenter", handlePrintRecord);
dropdownMenu.addEventListener("mouseleave", handleTerminatePrint);
