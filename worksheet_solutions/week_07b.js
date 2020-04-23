let img

function preload() {
  img = loadImage('sea-gate.jpg')
}

function setup() {
  createCanvas(400, 400)

}

function draw() {
  image(img, 0, 0)

  loadPixels()
  noStroke()

  let window = 25
  let xOffset = mouseX % window
  let yOffset = mouseY % window

  for (let y = 0; y < height; y += window) {
    for (let x = 0; x < width; x += window) {
      let index = (x + xOffset + (y + yOffset) * width) * 4

      let c = pixels[index]
      fill(c)
      rect(x, y, window, window)
    }
  }
}
