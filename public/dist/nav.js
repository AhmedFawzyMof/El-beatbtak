"use strict";

function FavLen() {
  var favlen = JSON.parse(localStorage.getItem("favlist"));
  var len = document.createElement("span");
  var icon = document.getElementById("favIcon");
  len.innerHTML = favlen.length;
  len.style = "\n    background: rgb(255, 151, 31);\n    width: 25px;\n    height: 25px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    color: #fff;\n    border-radius: 5px;\n    position: absolute;\n    top: -10px;\n    right: -10px;\n";
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
  console.log(menu.style.transform = "translateX(".concat(positionLeft, ")"));
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