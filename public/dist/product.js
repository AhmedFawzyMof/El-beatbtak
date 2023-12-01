"use strict";

function addToFav(id) {
  var ID = parseInt(id);
  var getFavs = JSON.parse(localStorage.getItem("favlist"));
  var findFav = getFavs.find(function (fav) {
    return fav === ID;
  });
  if (findFav == undefined) {
    getFavs.push(ID);
    localStorage.setItem("favlist", JSON.stringify(getFavs));
  }
  FavLen();
}
