function getIndex(x, y) {
  return ((y * width) + x) * 4;
}

function setup() {
  createCanvas(400, 400);
  stroke(0);
  fill(0);
  pixelDensity(1);
}

function draw() {
  loadPixels();

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let currentIndex = getIndex(x, y);
      
      let d = dist(width / 2, height / 2, x, y);
      let v = (sin(radians(d * 5 + frameCount * 10)) + 1) * 127;
      pixels[currentIndex] = v;
      pixels[currentIndex + 1] = v;
      pixels[currentIndex + 2] = v;
      
    }
  }

  updatePixels();
}
