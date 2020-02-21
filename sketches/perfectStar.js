function setup() {
  createCanvas(400, 400);
  stroke(0);
  fill(100);
  noLoop();
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  let sides = 10;
  let step = 360 / sides;
  let outerAmp = 100;
  
  // long winded way to find inner vertex via trigonometry
  let sideToCenter = sin(radians(54)) * outerAmp;
  let halfSideLength = cos(radians(54)) * outerAmp;
  let innerAmp = sideToCenter - tan(radians(36)) * halfSideLength;
  
  // the ratio of the inner vertex to the outer one is:
  // 0.38196601125010515179541
  // which can also be found by (3 - sqrt(5)) / 2
  
  beginShape();
  for (let i = 0; i <= 360; i += step) {
    let theta = radians(i - 90);
    let a;
    if (i % (step * 2) === 0) {
      a = outerAmp;
    } else {
      a = innerAmp;
    }
    let x = cos(theta) * a;
    let y = sin(theta) * a;
    vertex(x, y);
  }
  endShape();
}
