// our own background() function, it allows for r, g, b or grayscale arguments

function myBackground(r, g, b) {
  // just r means grayscale
  if (g === undefined && b === undefined) {
    g = b = r;
  }
  
  loadPixels();
  for (let i = 0; i < pixels.length; i+= 4) {
    pixels[i] = r;
    pixels[i + 1] = g;
    pixels[i + 2] = b;
    pixels[i + 3] = 255;
  }
  updatePixels();
}

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  myBackground(255, 0, 120);
}
