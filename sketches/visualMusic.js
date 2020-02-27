let oscillators = [];
let envelopes = [];
let numOscillators = 8;

let rootFrequency = 800;
let positions = Array(numOscillators).fill(null);

function setup() {
  createCanvas(400, 400);
  osc = new p5.SinOsc();

  let frequency = rootFrequency;

  for (let i = 0; i < numOscillators; i++) {
    let osc = new p5.SinOsc();
    osc.freq(frequency);
    oscillators[i] = osc;
    frequency *= 4 / 3;

    let envelope = new p5.Envelope();
    envelope.setADSR(0, 0.5, 0.04, 0.25);
    envelope.setRange(0.1, 0); // don't play the sound too loud or we'll clip
    envelopes[i] = envelope;
  }
}

function draw() {
  background(30);
  translate(width / 2, height / 2);


  noStroke();
  for (let i = 0; i < numOscillators; i++) {
    let theta = radians((numOscillators - i + 3) * frameCount * 0.25);
    let x = cos(theta) * (i + 3) * 10;
    let y = sin(theta) * (i + 3) * 10;
    if (positions[i]) {
      
      if (y > 0 && positions[i].y < 0) {
        oscillators[i].start(); 
        envelopes[i].play(oscillators[i]);
      }
      
      positions[i].x = x
      positions[i].y = y;
    } else {
      positions[i] = createVector(x, y);
    }
    
    ellipse(x, y, 5, 5);
  }
  stroke(150);
  line(0, 0, width / 2, 0);
}
