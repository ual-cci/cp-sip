function setup() {
  createCanvas(400, 400);
  fill(0);
  stroke(0);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  let ratio = 1; //frameCount * 0.01;
  let points = [];
  
  for (let i = 0; i < 360; i += 10) {
    let theta = radians(i * ratio);
    let x = cos(theta) * 100;
    let y = sin(theta) * 100;
    points.push({
      'x': x,
      'y': y
    })
  }
  
  let step = mouseX + 1;
  for (let i = 0; i < points.length; i+= 1) {
    let p1 = points[i];
    let p2 = points[(i + step) % points.length];
    line(p1.x, p1.y, p2.x, p2.y);
  }
    
}
