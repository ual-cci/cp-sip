let x, y;
let radius = 50;

function setup() {
  createCanvas(400, 400);
  x = random(radius, width - radius);
  y = random(radius, height - radius);
}

function draw() {
  background(255);

  fill(0);
  ellipse(x, y, radius * 2, radius * 2);
}

function mouseClicked() {
  let d = dist(mouseX, mouseY, x, y);
  if (d < radius) {
    x = random(radius, width - radius);
    y = random(radius, height - radius);
  }
}
