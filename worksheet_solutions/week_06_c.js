let img, originalPixels

function preload() {
  img = loadImage('frog.jpg')
}

function setup() {
  createCanvas(400, 400);
  img.loadPixels();
  originalPixels = img.pixels.slice()

  background(220);

  img.loadPixels()

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (y * width + x) * 4
      let [r, g, b] = originalPixels.slice(index, index + 3)

      let d = (255 - dist(x, y, 100, 180) * 1) / 255
      img.pixels[index] = r * d ;
      img.pixels[index +1] = g * d;
      img.pixels[index +2] = d * 170;
    }
  }

  img.updatePixels()

  image(img, 0, 0)
}
