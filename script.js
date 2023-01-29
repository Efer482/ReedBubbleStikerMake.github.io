const menuLinks = document.getElementsByClassName("menu-link");

var selectedCanva = 'previewImage1';
//Canva cargado
var finaleCanvas = document.getElementById("finaleImage1");
var canvas = document.getElementById("previewImage1");
var finaleCtx = finaleCanvas.getContext("2d");
var ctx = canvas.getContext("2d");
const sizeCanvaWidth = 600;
const sizeCanvaHeight = 600;
for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener("click", (event) => {
    event.preventDefault();
    let canvasId = event.target.getAttribute("data-canvas");
    loadCanvas(canvasId);
  });
}

function loadImagesCanva(canvasId, images) {
  this.selectedCanva = canvasId;
  switch (canvasId) {
    case 'previewImage1':
      finaleCtx.clearRect(0, 0, canvas.width, canvas.width);
      ctx.clearRect(0, 0, canvas.width, canvas.width);
      var img1 = new Image();
      img1.src = images[0];
      img1.onload = function () {
        ctx.drawImage(img1, 0, 0, canvas.width / 2, canvas.width / 2);
        finaleCtx.drawImage(img1, 0, 0, finaleCanvas.width / 2, finaleCanvas.width / 2);
      }

      var img2 = new Image();
      img2.src = images[1];
      img2.onload = function () {
        ctx.drawImage(img2, canvas.width / 2, 0, canvas.width / 2, canvas.width / 2);
        finaleCtx.drawImage(img2, finaleCanvas.width / 2, 0, finaleCanvas.width / 2, finaleCanvas.width / 2);
      }

      var img3 = new Image();
      img3.src = images[2];
      img3.onload = function () {
        ctx.drawImage(img3, 0, canvas.width / 2, canvas.width / 2, canvas.width / 2);
        finaleCtx.drawImage(img3, 0, finaleCanvas.width / 2, finaleCanvas.width / 2, finaleCanvas.width / 2);
      }

      var img4 = new Image();
      img4.src = images[3];
      img4.onload = function () {
        ctx.drawImage(img4, canvas.width / 2, canvas.width / 2, canvas.width / 2, canvas.width / 2);
        finaleCtx.drawImage(img4, finaleCanvas.width / 2, finaleCanvas.width / 2, finaleCanvas.width / 2, finaleCanvas.width / 2);
      }
      break;
    case 'previewImage2':
      finaleCtx.clearRect(0, 0, canvas.width, canvas.width);
      ctx.clearRect(0, 0, canvas.width, canvas.width);
      var img1 = new Image();
      img1.src = images[0];
      img1.onload = function () {
        ctx.drawImage(img1, 0, canvas.height / 2, canvas.width / 3, canvas.width / 3);
        finaleCtx.drawImage(img1, 0, canvas.height / 2, finaleCanvas.width / 3, finaleCanvas.width / 3);
      }

      var img2 = new Image();
      img2.src = images[1]

      img2.onload = function () {
        ctx.drawImage(img2, 100, 0, canvas.width / 1.1, canvas.width / 1.1);
        finaleCtx.drawImage(img2, 100, 0, finaleCanvas.width / 1.1, finaleCanvas.width / 1.1);
      }

      var img3 = new Image();
      img3.src = images[2]
      img3.onload = function () {
        ctx.drawImage(img3, 0, canvas.height / 10, canvas.width / 3, canvas.width / 3);
        finaleCtx.drawImage(img3, 0, finaleCanvas.height / 10, finaleCanvas.width / 3, finaleCanvas.width / 3);
      }
      break;
    default:
      break;
  }
}
function loadCanvas(canvasId) {
  this.finaleCanvas = document.getElementById(canvasId);
  this.canvas = document.getElementById(canvasId);

  this.finaleCtx = finaleCanvas.getContext("2d");
  this.ctx = canvas.getContext("2d");

  this.finaleCanvas.height = 4848;
  this.finaleCanvas.width = 4848;
  this.canvas.height = 600;
  this.canvas.width = 600;
  // código para ocultar los otros canvas
  let canvasList = document.querySelectorAll("canvas");
  canvasList.forEach((c) => {
    if (c.id !== canvasId) {
      c.classList.add("displayFalse");
    }
  });
  var imagesPreview = ['/Img/img1.png', '/Img/img2.png' , '/Img/img3.png', '/Img/img4.png']
  switch (canvasId) {
    case 'previewImage1':
      this.canvas.classList.remove('displayFalse')
      loadImagesCanva('previewImage1', imagesPreview);
      break;
    case 'previewImage2':
      this.canvas.classList.remove('displayFalse')
      loadImagesCanva('previewImage2', imagesPreview);

      break;

    default:
      break;
  }
}

// Crear elemento input para seleccionar carpeta
var input = document.createElement("input");
input.type = "file";
input.webkitdirectory = true;
input.multiple = true;

// Obtengo los botones
let selectFolderButton = document.getElementById("select-folder-button");
let changeImageButton = document.getElementById("remake-image-button");
let downloadButton = document.getElementById("dowloand-image-button");



// Establecer tamaño del canvas

selectFolderButton.addEventListener("click", function () {
  input.click();
});
input.addEventListener("change", function () {
  changeImageButton.classList.add('displayFalse');
  downloadButton.classList.add('displayFalse');
  var imagesArray = [];
  var files = input.files;
  var counter = 0;
  for (var i = 0; i < files.length; i++) {
    if (files[i].type.match(/image.*/)) {
      var url = URL.createObjectURL(files[i]);
      imagesArray.push(url);
      var img = new Image();
      img.src = url;
      img.onload = function () {
        counter++;
        if (counter === files.length) {
          selectRandomImages(selectedCanva);
          setTimeout(() => {
            changeImageButton.classList.remove('displayFalse');
            downloadButton.classList.remove('displayFalse');

            // Crear botón para Rehacer la imagen
            changeImageButton.innerHTML = "Rehacer imagen";
            changeImageButton.onclick = function () {
              finaleCtx.clearRect(0, 0, canvas.width, sizeCanvaHeight);
              ctx.clearRect(0, 0, canvas.width, sizeCanvaHeight);

              selectRandomImages(selectedCanva);
            }
            // Crear botón para descargar imagen
            downloadButton.innerHTML = "Descargar imagen";
            downloadButton.onclick = function () {
              finaleCanvas.classList.remove('displayFalse')
              finaleCanvas.classList.add('displayTrue')
              var link = document.createElement("a");
              link.href = finaleCanvas.toDataURL();
              link.download = "miImagen.png";
              link.click();
              finaleCanvas.classList.remove('displayTrue')
              finaleCanvas.classList.add('displayFalse')
            }
          }, 600);
        }
      }
    }
  }

  function selectRandomImages(canvasId) {
    var randomImages = [];
    while (randomImages.length === 6) {
      
    }
    for (var i = 0; i < 4; i++) {
      var randomIndex = Math.floor(Math.random() * imagesArray.length);
      // check if the random image is already in the randomImages array
      while (randomImages.includes(imagesArray[randomIndex])) {
      // if it is, get a new random index
      randomIndex = Math.floor(Math.random() * imagesArray.length);
      }
      // add the new random image to the randomImages array
      randomImages.push(imagesArray[randomIndex]);
      }
      loadImagesCanva(canvasId, randomImages);
  }

});
