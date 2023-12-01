function addToFav(id) {
  const ID = parseInt(id);
  const getFavs = JSON.parse(localStorage.getItem("favlist"));
  const findFav = getFavs.find((fav) => {
    return fav === ID;
  });
  if (findFav == undefined) {
    getFavs.push(ID);
    localStorage.setItem("favlist", JSON.stringify(getFavs));
  }
  FavLen();
}
