let canvas = document.querySelector("#canvas");

let context = canvas.getContext("2d");

const window_height = window.innerHeight;
const window_width = window.innerWidth;

canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#edf";

class Image {
  constructor(imagePath, xpos, ypos, width, height) {
    this.imagePath = imagePath;
    this.xpos = xpos;
    this.ypos = ypos;
    this.width = width;
    this.height = height;
  }
}

function createImage(context, imagePath, xpos, ypos, width, height) {
  let myImage = document.createElement("img");
  myImage.src = imagePath;
  myImage.onload = function () {
    context.drawImage(myImage, xpos, ypos, width, height);
  };
}

let image = new Image("image.jpeg", 50, 50, 480, 300);
createImage(context, image.imagePath, image.xpos, image.ypos, image.width, image.height);
