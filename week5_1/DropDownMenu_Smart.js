/* ~~~~~~~~~~~~~~~~~~~~~~~~ handling menu bar ~~~~~~~~~~~~~~~~~~~~~~~~ */
function handleMenuDisplay() {
  const menu = arguments[1].target.nextElementSibling;
  tId = setTimeout(() => {
    menu.classList.toggle("hide");
  }, arguments[0]);
}

function handleTerminateSchedule() {
  clearTimeout(tId);
}

function handleMenuHide(event) {
  const menu = event.target.querySelector(".menu");
  if (!menu.classList.contains("hide")) {
    menu.classList.add("hide");
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~ execution ~~~~~~~~~~~~~~~~~~~~~~~~ */
const DELAY_TIME = 1000;
let tId = 0;

// get elements
const dropdown = document.querySelector(".dropdown_menu_smart");
const dropdownTitle = dropdown.querySelector(".title");

//bind listeners to elements above
dropdownTitle.addEventListener("mouseenter", handleMenuDisplay.bind(event, DELAY_TIME));
dropdownTitle.addEventListener("mouseleave", handleTerminateSchedule);
dropdown.addEventListener("mouseleave", handleMenuHide);
