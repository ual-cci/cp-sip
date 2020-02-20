function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  loadPixels();
  
  let adjust = 255 / width; // assume width == height
    
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (y * width + x) * 4;
      pixels[index] = frameCount % 255;
      pixels[index +1] = x * adjust;
      pixels[index + 2] = y * adjust;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();
}
