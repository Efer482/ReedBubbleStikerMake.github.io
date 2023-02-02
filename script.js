const menuLinks = document.getElementsByClassName("menu-link");

var selectedCanva = 'previewImage1';
//Canva cargado
var finaleCanvas
var canvas
var finaleCtx
var ctx;
var imagesArray = [];

for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener("click", (event) => {
    event.preventDefault();
    let canvasId = event.target.getAttribute("data-canvas");
    removeAllCanvasElements();
    contentCanva = document.querySelector(`#contentCanva`);
    let newFinaleCanvas = document.createElement("canvas");
    let newCanvas = document.createElement("canvas");
    newFinaleCanvas.setAttribute("id", 'finaleImage' + canvasId);
    newCanvas.setAttribute("id", 'previewImage' + canvasId);
    contentCanva.appendChild(newFinaleCanvas);
    contentCanva.appendChild(newCanvas);
    loadCanvas(canvasId);
  });
}

function removeAllCanvasElements() {
  let canvasElements = document.querySelectorAll("canvas");
  canvasElements.forEach((canvas) => {
    canvas.remove();
  });
}


function loadImagesCanva(canvasId, images, reload = false) {
  if ((images === [] || images === undefined) && !reload) {
    images = ['/Img/img1.png', '/Img/img2.png', '/Img/img3.png', '/Img/img4.png']

  }
  canvasName = 'previewImage' + canvasId;
  console.log(34, images, canvasName)

  this.selectedCanva = canvasId;
  var imgWithDataView = []
  var imgWithDataFinale = []
  finaleCanvas = this.finaleCanvas;
  canvas = this.canvas;
  switch (canvasName) {
    case 'previewImage1':
      /**View Canvas */
      imgWithDataView['img1'] = { 'imgUrl': images[0], 'positionX': 0, 'positionY': 0, 'width': canvas.width / 2, 'height': canvas.height / 2 }
      imgWithDataView['img2'] = { 'imgUrl': images[1], 'positionX': canvas.width / 2, 'positionY': 0, 'width': canvas.width / 2, 'height': canvas.height / 2 }
      imgWithDataView['img3'] = { 'imgUrl': images[2], 'positionX': 0, 'positionY': canvas.height / 2, 'width': canvas.width / 2, 'height': canvas.height / 2 }
      imgWithDataView['img4'] = { 'imgUrl': images[3], 'positionX': canvas.width / 2, 'positionY': canvas.height / 2, 'width': canvas.width / 2, 'height': canvas.height / 2 }
      /**
       * Finale Canvas
       */
      imgWithDataFinale['img1'] = { 'imgUrl': images[0], 'positionX': 0, 'positionY': 0, 'width': finaleCanvas.width / 2, 'height': finaleCanvas.height / 2 }
      imgWithDataFinale['img2'] = { 'imgUrl': images[1], 'positionX': finaleCanvas.width / 2, 'positionY': 0, 'width': finaleCanvas.width / 2, 'height': finaleCanvas.height / 2 }
      imgWithDataFinale['img3'] = { 'imgUrl': images[2], 'positionX': 0, 'positionY': finaleCanvas.height / 2, 'width': finaleCanvas.width / 2, 'height': finaleCanvas.height / 2 }
      imgWithDataFinale['img4'] = { 'imgUrl': images[3], 'positionX': finaleCanvas.width / 2, 'positionY': finaleCanvas.height / 2, 'width': finaleCanvas.width / 2, 'height': finaleCanvas.height / 2 }
      break;
    case 'previewImage2':
      /**View Canvas */

      imgWithDataView['img1'] = { 'imgUrl': images[0], 'positionX': 0, 'positionY': 0, 'width': canvas.width / 2.5, 'height': canvas.width / 2.5 }
      imgWithDataView['img2'] = { 'imgUrl': images[1], 'positionX': 0, 'positionY': 350, 'width': canvas.width / 2.5, 'height': canvas.width / 2.5 }
      imgWithDataView['img3'] = { 'imgUrl': images[2], 'positionX': parseInt(((canvas.width - canvas.width / 1.1) / 2) + imgWithDataView['img1'].width / 2), 'positionY': parseInt((canvas.height - canvas.width) / 2), 'width': canvas.width / 0.8, 'height': canvas.width / 0.8 }
      /**
       * Finale Canvas
       */
      imgWithDataFinale['img1'] = { 'imgUrl': images[0], 'positionX': 0, 'positionY': 0, 'width': +finaleCanvas.width / 2.5, 'height': +finaleCanvas.width / 2.5 }
      imgWithDataFinale['img2'] = { 'imgUrl': images[1], 'positionX': 0, 'positionY': 350, 'width': +finaleCanvas.width / 2.5, 'height': +finaleCanvas.width / 2.5 }
      imgWithDataFinale['img3'] = { 'imgUrl': images[2], 'positionX': parseInt(((+finaleCanvas.width - +finaleCanvas.width / 1.1) / 2) + imgWithDataFinale['img1'].width / 2), 'positionY': parseInt((+finaleCanvas.height - +finaleCanvas.width) / 2), 'width': +finaleCanvas.width / 0.8, 'height': +finaleCanvas.width / 0.8 }
      break;
    default:
      break;
  }

  setTimeout(() => {

    loadImages(imgWithDataFinale, finaleCanvas).then(() => {
      loadImages(imgWithDataView, canvas);
    })
  }, 0);

}

let loadedImages = 0;

function loadImages(imgWithData, myCanvas) {
  return new Promise((resolve, reject) => {
    this.ctx = myCanvas.getContext("2d");
    this.ctx.clearRect(0, 0, myCanvas.width, myCanvas.width);

    function loadNextImage(i) {
      document.getElementById("contentLoader").classList.remove("oculto");
      document.body.style.overflow = "hidden";
      if (i >= Object.keys(imgWithData).length) {
        document.body.style.overflow = "scroll";
        document.getElementById("contentLoader").classList.add("oculto");
        resolve();
        return
      };
      var img = imgWithData[Object.keys(imgWithData)[i]];
      loadImageCanva(img.imgUrl, img.width, img.height, ctx, img.positionX, img.positionY, function () {
        i++;
        var imgData = ctx.getImageData(img.positionX, img.positionY, img.width, img.height);
        Promise.all([isImageTouchingBounds(img, myCanvas, imgData)]).then(function (results) {
          console.log(ctx)
          if (results[0]) {
            this.ctx.clearRect(0, 0, myCanvas.width, myCanvas.width);
            i = 0;
            // Reducir tamaño de la imagen y volver a calcular posición
            img.width = parseInt(img.width * 0.8);
            img.height = parseInt(img.height * 0.8);
            // Calcular nueva posición
            img.positionX = parseInt(((myCanvas.width - myCanvas.width / 1.1) / 2) + imgWithData['img1'].width / 2)
            img.positionY = parseInt((myCanvas.height - myCanvas.width) / 2);
            // Repetir proceso hasta que la imagen ya no toque los bordes
            while (isImageTouchingBounds(img, myCanvas, imgData)[0]) {
              img.width = parseInt(img.width * 0.8);
              img.height = parseInt(img.height * 0.8);
              img.positionX = parseInt(((myCanvas.width - myCanvas.width / 1.1) / 2) + imgWithData['img1'].width / 2)
              img.positionY = parseInt((myCanvas.height - myCanvas.width) / 2);
              this.ctx.clearRect(0, 0, myCanvas.width, myCanvas.width);
              i = 0;

            }
          } else {

          }
          loadNextImage(i++);
        });
      });
    }
    loadNextImage(0);
  })
}


function isImageTouchingBounds(img, myCanvas, imgData, paintData = false) {
  return new Promise(function (resolve, reject) {
    var myCtx = myCanvas.getContext('2d');
    const imgPixels = imgData.data;
    let pix = 4;
    let touching = false
    for (let i = 0; i < imgPixels.length; i += pix) {
      var x = (i / pix) % imgData.width + img.positionX;
      var y = parseInt((i / pix) / imgData.width) + img.positionY;
      if (x === 0 || x === myCanvas.width - 1 || y === 0 || y === myCanvas.height - 1) {
        if (imgPixels[i + 3] !== 0) {
          for (let x1 = x - 5; x1 <= x + 5; x1++) {
            for (let y1 = y - 5; y1 <= y + 5; y1++) {
              const i2 = ((y + Math.floor((y1 / 4) / imgData.width)) * imgData.width + (x1 + (y1 / 4) % imgData.width)) * 4;
              if (paintData) {
                paintToColorInCanva(myCtx, '#90FF33', [x1, y1], 1)
              }

            }
          }
          if (!paintData) {
            resolve(true)
            return
          } else {
            touching = true
          }

        }
      }
    }
    resolve(touching);
  });
}

function paintToColorInCanva(myCtx, color = '#90FF33', position, size = 1) {
  myCtx.fillStyle = color
  myCtx.fillRect(position[0], position[1], size, size)
}


function loadImageCanva(imgUrl, width, height, canvasToLoad, positionX, positionY, callback) {
  var img = new Image();
  img.src = imgUrl;
  img.onload = function () {
    canvasToLoad.drawImage(img, positionX, positionY, width, height);
    if (callback) callback();
  }
}

function getPixel(img, x, y) {

}
function loadCanvas(canvasId) {
  canvasName = 'previewImage' + canvasId;

  this.finaleCanvas = document.getElementById('finaleImage' + canvasId);
  this.canvas = document.getElementById('previewImage' + canvasId);
  this.finaleCtx = canvas.getContext("2d");
  this.ctx = canvas.getContext("2d");
  this.finaleCanvas.height = 4848;
  this.finaleCanvas.width = 4848;
  this.canvas.height = 600;
  this.canvas.width = 600;
  // código para ocultar los otros canvas
  let canvasList = document.querySelectorAll("canvas");
  canvasList.forEach((c) => {
    if (c.id !== canvasName) {
      c.classList.add("displayFalse");
    }
  });
  switch (canvasName) {
    case 'previewImage1':
      this.canvas.classList.remove('displayFalse')
      break;
    case 'previewImage2':
      this.canvas.classList.remove('displayFalse')

      break;

    default:
      break;
  }
  var images = selectRandomImages()
  loadImagesCanva(canvasId, images);
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
  document.getElementById("contentLoaderImages").classList.remove("oculto");
  document.body.style.overflow = "hidden";
  this.imagesArray = [];
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
            document.body.style.overflow = "scroll";
            document.getElementById("contentLoaderImages").classList.add("oculto");
            // Crear botón para Rehacer la imagen
            changeImageButton.innerHTML = "Rehacer imagen";
            changeImageButton.onclick = function () {
              function clearFinaleCanvas() {
                return new Promise(resolve => {
                  finaleCtx.clearRect(0, 0, finaleCanvas.width, finaleCanvas.width);
                  resolve();
                });
              }
              
              clearFinaleCanvas().then(function() {
                // ctx.clearRect(0, 0, canvas.width, canvas.width); 
                console.log('oe')
                document.body.style.overflow = "scroll";
                document.getElementById("contentLoader").classList.add("oculto");
                selectRandomImages(selectedCanva);
              });

            }
            // Crear botón para descargar imagen
            downloadButton.innerHTML = "Descargar imagen";
            downloadButton.onclick = function () {
              document.getElementById("contentLoaderDowload").classList.remove("oculto");
              document.body.style.overflow = "hidden";
              finaleCanvas.classList.remove('displayFalse')
              finaleCanvas.classList.add('displayTrue');
              setTimeout(() => {
                var link = document.createElement("a");
                link.href = finaleCanvas.toDataURL();
                link.download = "miImagen.png";
                link.click();
                finaleCanvas.classList.remove('displayTrue')
                finaleCanvas.classList.add('displayFalse')
                document.body.style.overflow = "scroll";
                document.getElementById("contentLoaderDowload").classList.add("oculto");
              }, 0);
              // canvas.classList.remove('displayFalse')
              // canvas.classList.add('displayTrue')
            }
          }, 0);
        }
      }
    }
  }

}
  );
function selectRandomImages() {
  var randomImages = [];
  if (imagesArray !== undefined && imagesArray.length) {
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
  }
  loadImagesCanva(this.selectedCanva, randomImages, true);
}
