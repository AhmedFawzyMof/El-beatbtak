"use strict";

function FavLen() {
  const favlen = JSON.parse(localStorage.getItem("favlist"));
  const len = document.createElement("span");
  const icon = document.getElementById("favIcon");
  len.innerHTML = favlen.length;
  len.style = `
    background: rgb(255, 151, 31);
    width: 25px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 5px;
    position: absolute;
    top: -10px;
    right: -10px;
`;
  icon.appendChild(len);
}

var MenuBtn = document.getElementById("menu");
var MenuBar = document.getElementById("menuBar");
function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}
MenuBtn.addEventListener("click", function () {
  MenuBar.classList.toggle("active");
  if (MenuBar.classList.contains("active")) {
    MenuBar.style.transform = "translateX(-5px)";
    // To get the scroll position of current webpage
    var TopScroll = window.pageYOffset || document.documentElement.scrollTop;
    var LeftScroll = window.pageXOffset || document.documentElement.scrollLeft;
    // if scroll happens, set it to the previous value
    window.onscroll = function () {
      window.scrollTo(LeftScroll, TopScroll);
    };
  } else {
    MenuBar.style.transform = "translateX(105%)";
    window.onscroll = function () {};
  }
});

var menu = document.getElementById("menuBar");
var isDragStartMenu = false,
  prevPageXMenu,
  prevScrollLeftMenu,
  positionDiffMenu;
var scrollWidthMenu = menu.scrollWidth - menu.clientWidth;
var dragStartMenu = function dragStartMenu(e) {
  isDragStartMenu = true;
  prevPageXMenu = e.pageX || e.touches[0].pageX;
  prevScrollLeftMenu = menu.scrollLeft;
};
var draggingMenu = function draggingMenu(e) {
  if (!isDragStartMenu) return;
  e.preventDefault();
  menu.classList.add("dragging");
  positionDiffMenu = (e.pageX || e.touches[0].pageX) - prevPageXMenu;
  menu.scrollLeft = prevScrollLeftMenu - positionDiffMenu;
  var positionLeft = JSON.stringify(positionDiffMenu) + "px";
  console.log((menu.style.transform = "translateX(".concat(positionLeft, ")")));
  if (positionDiffMenu >= 175) {
    menu.style.transform = "translateX(105%)";
    menu.classList.remove("active");
    window.onscroll = function () {};
  } else if (positionDiffMenu <= 0) {
    menu.style.transform = "translateX(-5px)";
    dragStopMenu();
  }
};
var dragStopMenu = function dragStopMenu() {
  isDragStartMenu = false;
  menu.classList.remove("dragging");
};
menu.addEventListener("touchstart", dragStartMenu);
menu.addEventListener("touchmove", draggingMenu);
menu.addEventListener("touchend", dragStopMenu);

FavLen();
