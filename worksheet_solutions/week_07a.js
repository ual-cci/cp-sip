let img

function preload() {
  img = loadImage('sea-gate.jpg')
}

function setup() {
  createCanvas(400, 400)

  image(img, 0, 0)

  loadPixels()

  let sum = 0
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let index = (x + y * width) * 4
      sum += pixels[index]
    }
  }
  let average = sum / (width * height)
  print(average)

  background(average)
}
