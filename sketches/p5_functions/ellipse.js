// our own implementation of ellipse()

function myEllipse(centerX, centerY, w, h) {
  // radius in x and y
  let rx = w / 2;
  let ry = h / 2;
  
  beginShape();
  for (let i = 0; i < 360; i += 20) {
    let theta = radians(i);
    let x = cos(theta) * rx;
    let y = sin(theta) * ry;
    vertex(centerX + x, centerY + y);
  }
  endShape(CLOSE);
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
  myEllipse(mouseX, mouseY, 50, 100);
}
