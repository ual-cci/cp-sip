let ripples

function preload() {
  ripples = loadImage('ripples.jpg')
}

function setup() {
  createCanvas(400, 400);
  background(0)

  // edge detection
  let kernel = [
    [0, -1, 0],
    [-1,  5, -1],
    [0, -1, 0]
  ]

  let filteredImg = convolve(ripples, kernel)
  image(filteredImg, 0, 0)
}

function convolvePixel(x, y, img, kernel) {
  let output = 0

  let kernelSize = kernel.length
  let kernelRadius = floor(kernelSize / 2)

  for (let j = -kernelRadius; j <= kernelRadius; j++) {
    for (let i = -kernelRadius; i <= kernelRadius; i++) {

      let kernelX = kernelSize - (i + kernelRadius) - 1
      let kernelY = kernelSize - (j + kernelRadius) - 1

      let px = x + i
      let py = y + j
      let pixelIndex = (px + py * width) * 4
      output += img.pixels[pixelIndex] * kernel[kernelY][kernelX]
    }
  }
  return output
}

function convolve(img, kernel) {
  let output = createImage(img.width, img.height)

  img.loadPixels()
  output.loadPixels()

  for (let y = 1; y < img.height - 1; y++) {
    for (let x = 1; x < img.width - 1; x++) {
      let index = (x + y * img.width) * 4
      let result = 0

      result = convolvePixel(x, y, img, kernel)

      output.pixels[index] = result
      output.pixels[index + 1] = result
      output.pixels[index + 2] = result
      output.pixels[index + 3] = 255

    }
  }

  output.updatePixels()

  return output
}
