let img, pixelsCopy

function preload() {
  img = loadImage('frog.jpg')
}

function setup() {
  createCanvas(400, 400)

  img.loadPixels()
  pixelsCopy = img.pixels.slice()
}

function draw() {
  img.loadPixels()

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4
      let [r, g, b] = pixelsCopy.slice(index, index + 3)

      if (y < mouseY) {
        // luma from the YUV colour space
        let luma = r * 0.299 + g * 0.587 + b * 0.114

        // use one of the three variables above
        img.pixels[index] = luma
        img.pixels[index + 1] = luma
        img.pixels[index + 2] = luma
      } else {
        img.pixels[index] = r
        img.pixels[index + 1] = g
        img.pixels[index + 2] = b
      }
    }
  }
  img.updatePixels()

  image(img, 0, 0)
}
