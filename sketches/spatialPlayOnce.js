// play a sound when the mouse goes over halfway in the y direction
let osc, envelope;

let lastMouseY = 0;

function setup() {
  createCanvas(400, 400);
  osc = new p5.SinOsc();
  osc.freq(440);

  envelope = new p5.Envelope();
  envelope.setADSR(0, 0.1, 0.1, 0.25);

}

function draw() {
  background(200);
  
  let threshold = height / 2;
  line(0, threshold, width, threshold);  

  
  if (mouseY > threshold && lastMouseY < threshold) {
    osc.start();
    envelope.play(osc);
  }
  
  lastMouseY = mouseY;
}
