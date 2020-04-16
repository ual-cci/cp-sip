let img

function preload() {
  img = loadImage('sea-gate.jpg')
}

function setup() {
  createCanvas(400, 400);

  // draw the image first
  image(img, 0, 0)

  loadPixels()

  let windowSize = 15
  let radius = floor(windowSize / 2)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // for each pixel
      let sum = 0
      let count = 0
      for (let j = -radius; j <= radius; j++) {
        for (let i = -radius; i < radius; i++) {
          let px = x + i
          let py = y + j
          if (px >= 0 && px < width && py >= 0 && py < height) {
            sum += pixels[(px + py * width) * 4]
            count += 1
          }
        }
      }
      let average = sum / count

      let index = (x + y * width) * 4
      pixels[index] = average
      pixels[index + 1] = average
      pixels[index + 2] = average
    }
  }

  updatePixels()
}