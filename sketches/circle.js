function setup() {
  createCanvas(400, 400);
  strokeWeight(3);
  background(250);
}

function draw() {
  translate(width / 2, height / 2);
  
  let angle = map(mouseX, 0, width, 0, TWO_PI);
  let radius = 100;
  let x = cos(angle) * radius;
  let y = sin(angle) * radius;
  point(x, y);
}
