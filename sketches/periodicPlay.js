let osc, envelope;
let nextTrigger = 0;

function setup() {
  createCanvas(400, 400);
  osc = new p5.SinOsc();
  osc.freq(440);

  envelope = new p5.Envelope();
  envelope.setADSR(0, 0.1, 0.1, 0.25);
}

function draw() {
  background(200);
  let time = int(millis() / 1000);
  
  if (time > nextTrigger) {
    osc.start();
    envelope.play(osc);
    nextTrigger += 1; // trigger again after 1 second
  }
}
