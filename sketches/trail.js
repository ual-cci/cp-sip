let points = [];

function setup() {
  createCanvas(400, 400);
  stroke(0);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  let theta = millis() / 1000;
  let rad = 150;
  let x = cos(theta * 3) * rad;
  let y = sin(theta * 2) * rad;


  points.push({
    x: x,
    y: y
  })
  
  if (points.length > 100) {
    points.shift(); 
  }

  for (let i = 1; i < points.length; i++) {
    let a = points[i - 1];
    let b = points[i];
    strokeWeight(i / 2);
    line(a.x, a.y, b.x, b.y);
  }
}
