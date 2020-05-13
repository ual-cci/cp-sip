let phase = 0

function setup() {
  createCanvas(400, 400);
  noStroke()
}

function draw() {
  background(255)
  translate(width / 2, height / 2)
  concentric(0, 350, 50, true)
  phase += 0.01
}

function concentric(n, diam, gap, isBlack) {
  if (diam > 0) {
    if (isBlack) {
      fill(0)
    } else {
      fill(255)
    }
    let rotation = n * 0.2 + phase
    let x = cos(rotation) * n * 15
    let y = sin(rotation) * n * 15
    ellipse(x, y, diam, diam)
    concentric(n + 1, diam - gap, gap, !isBlack)
  }
}
