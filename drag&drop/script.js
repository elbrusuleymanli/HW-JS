let shapes = document.querySelectorAll("#color");
let dropZones = document.querySelectorAll("#dropbox");


shapes.forEach((shape) => {
  shape.addEventListener("dragstart", function (e) {
    e.dataTransfer.setData("text", e.target.style.backgroundColor);
    e.dataTransfer.setData("multy", e.target.value);
   
  });


  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", function (e) {
      e.preventDefault();
    });

    zone.addEventListener("drop", function (e) {

      e.target.style.backgroundColor = e.dataTransfer.getData("text");
      e.target.style.backgroundColor = e.dataTransfer.getData("multy");
    });
  });
});



