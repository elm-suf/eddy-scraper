document.getElementById("btn").onclick = (evt) => getData();

function displayCount(count) {
  document.getElementById("count-p").style.display = "block";
  document.getElementById("count-sp").textContent = count;
}

async function getData() {
  document.getElementById("count-p").style.display = "none";

  const placeId = document.getElementById("placeId").value;
  const count = document.getElementById("count").value;
  const port = 6969;

  document.getElementById("loading").style.display = "block";
  fetch(`/data/${placeId}/${count}`)
    .then((response) => {
      for (var pair of response.headers.entries()) {
        if (pair[0] === "x-count") {
          displayCount(pair[1]);
        }
      }
      return response.blob();
    })
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      document.getElementById("loading").style.display = "none";

      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove(); //afterwards we remove the element again
    });
}
