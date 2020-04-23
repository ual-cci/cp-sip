let img

function preload() {
  img = loadImage('sea-gate.jpg')
}

function setup() {
  createCanvas(400, 400)

  image(img, 0, 0)

  loadPixels()
  noStroke()

  let window = 25

  for (let y = 0; y < height; y += window) {
    for (let x = 0; x < width; x += window) {
      let index = (x + y * width) * 4

      let sum = 0
      for (let j = 0; j < window; j++) {
        for (let i = 0; i < window; i++) {
          let index2 = (x + i + (y + j) * width) * 4
          sum += pixels[index2]
        }
      }
      let average = sum / (window * window)

      fill(average)
      rect(x, y, window, window)
    }
  }
}
