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

/* ~~~~~~~~~~~~~~~~~~~~~~~~ rendor mouse record ~~~~~~~~~~~~~~~~~~~~~~~~ */
function handleMouseRecord(event) {
  if (!timer) {
    timer = setTimeout(function () {
      timer = null;
      rendorMouseRecord(event.target.innerText);
    }, 500);
  }
}

function rendorMouseRecord(innerText) {
  const mouseRecord = document.querySelector("#mouse_movement_record");
  const tag = document.querySelector(`.${innerText}`);
  if (tag === null) {
    const innerHTML = `<div class="mouse-record">
                         <span class="${innerText}">${innerText}</span>
                         <span class="${innerText}_cnt">1</span>
                       </div>`;
    mouseRecord.insertAdjacentHTML("afterend", innerHTML);
  } else {
    const tagCnt = tag.nextElementSibling;
    tagCnt.innerText = Number(tagCnt.innerText) + 1;
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~ execution ~~~~~~~~~~~~~~~~~~~~~~~~ */
const DELAY_TIME = 1000;
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
