document.getElementById("btn").onclick = (evt) => getData();

async function getData() {
  const placeId = document.getElementById("placeId").value;
  const count = document.getElementById("count").value;
  const port = 6969;

  fetch(`/data/${placeId}/${count}`)
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "data.csv";
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove(); //afterwards we remove the element again
    });
}
