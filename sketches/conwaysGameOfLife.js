function getIndex(x, y) {
  return (y * width + x) * 4;
}

function isAlive(pixels, index) {
  if (pixels[index] < 127) {
    return true;
  } else {
    return false;
  }
}

function makeAlive(index) {
  pixels[index] = 0;
  pixels[index + 1] = 0;
  pixels[index + 2] = 0;
}

function makeDead(index) {
  pixels[index] = 255;
  pixels[index + 1] = 255;
  pixels[index + 2] = 255;
}

function setup() {
  createCanvas(400, 400);
  stroke(0);
  fill(0);
  pixelDensity(1);
  frameRate(5);

  background(255);

  loadPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    let c = 0;
    if (random(0, 1) < 0.5) {
      c = 255;
    }
    pixels[i] = c;
    pixels[i + 1] = c;
    pixels[i + 2] = c;
  }
  updatePixels();

}

function draw() {
  loadPixels();

  let oldPixels = pixels.slice();

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let currentIndex = getIndex(x, y);
      
      let neighbouringIndices = [
        getIndex(x - 1, y - 1),
        getIndex(x, y - 1),
        getIndex(x + 1, y - 1),
        getIndex(x - 1, y),
        getIndex(x + 1, y),
        getIndex(x - 1, y + 1),
        getIndex(x, y + 1),
        getIndex(x + 1, y + 1),
      ];

      let numAlive = 0;
      for (let i = 0; i < neighbouringIndices.length; i++) {
        let index = neighbouringIndices[i];
        if (isAlive(oldPixels, index)) {
          numAlive++; 
        }
      }
      
      let currentAlive = isAlive(oldPixels, currentIndex);
      
      if (currentAlive) {
        if (numAlive < 2) {
           makeDead(currentIndex);
        }
        else if (numAlive > 3) {
          makeDead(currentIndex);
        }
      }
      else {
        if (numAlive == 3) {
          makeAlive(currentIndex); 
        }
      }
    }
  }

  updatePixels();

}
