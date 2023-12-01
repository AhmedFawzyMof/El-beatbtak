async function Furniture() {
  const favIds = JSON.parse(localStorage.getItem("favlist"));
  const body = JSON.stringify({ ids: favIds });
  const getFurniture = await fetch("/getFurnture", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });
  const data = await getFurniture.json();
  let html = "";
  const container = document.querySelector(".container");
  if (data.Furniture.length > 0) {
    data.Furniture.forEach((f) => {
      html += `<div class="furniture">
    <button id="addtofav" onclick="Remove('${f.id}')">
            <i class='bx bx-x-circle' ></i>        
       </button>
        <a href="/product/${f.id}">
          <img class="image" src="data:image/png;base64,${f.image}" />
          <div class="body">
            <p>${f.name}</p>
          </div>
        </a>
        <p class="price">${f.price} l.e</p>
      </div>`;
    });
  } else {
    html = "<h2>لا يوجد اثاث في قائمة المفضله</h2>";
  }
  container.innerHTML = html;
}

Furniture();

function Remove(id) {
  const Id = parseInt(id);
  const favList = JSON.parse(localStorage.getItem("favlist"));
  let findId = {};
  favList.forEach((f, i) => {
    if (f === Id) {
      findId["id"] = f;
      findId["index"] = i;
    }
  });
  favList.splice(findId.index, 1);
  localStorage.setItem("favlist", JSON.stringify(favList));
  location.reload();
}
