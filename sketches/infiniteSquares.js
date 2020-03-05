function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(255);

  let numCols = 10;
  let colWidth = width / numCols;

  let numRows = 10;
  let rowHeight = height / numRows;

  for (let j = 0; j < numRows; j++) {
    for (let i = -2; i < numCols; i++) {
      if (i % 2 == 0) {
        fill(0);
      } else {
        fill(255);
      }
      let offset = (frameCount * j *0.1) % (colWidth * 2);
      rect(i * colWidth + offset, j * rowHeight, colWidth, height / 2);
    }
  }
}
