// there are many ways to convert to grayscale

let img

function preload() {
  img = loadImage('frog.jpg')
}

function setup() {
  createCanvas(400, 400)

  img.loadPixels()
  for (let i = 0; i < img.pixels.length; i+= 4) {
    let [r, g, b] = img.pixels.slice(i, i + 3)

    // average (a rough and ready approach)
    let average = (r + g + b) / 3

    // luminance
    let luminance = r * 0.2126 + g * 0.7152 + b * 0.0.0722

    // luma from the YUV colour space
    let luma = r * 0.299 + g * 0.587 + b * 0.114

    // use one of the three variables above
    img.pixels[i] = luma
    img.pixels[i + 1] = luma
    img.pixels[i + 2] = luma
  }
  img.updatePixels()

  image(img, 0, 0)
}
