## Computational Practices: Sound and Image Processing

Will Gallia  
`w.gallia@arts.ac.uk`  
Thursdays, 13:30 to 17:30, B501-03


## Week 3
### Getting started with audio & visual music

---

## Last week recap & warmup

Let's write a sketch that shows:

![](https://github.com/ual-cci/cp-sip/raw/master/images/fairground.gif)

---

## Introduction

* What is sound?
* How do we hear?
* What is a speaker?

![](https://upload.wikimedia.org/wikipedia/commons/7/77/Waveforms.svg)

---

## Digital audio

In a digital system we need to quantize things, both in time and amplitude.

![](https://upload.wikimedia.org/wikipedia/commons/b/bf/Pcm.svg)

We sample the waveform at discreet intervals at some frequency, this is the sample rate.

For the amplitude we need to choose a range of values that each sample can be, we call this the bit depth. In the image above, there are 16 possible values for each sample, the nearest one is chosen.

What's important when choosing a sampling rate or bit depth?

---

## Let's make some sound

Demo:

```py
import wave
from math import pi, sin
from array import array

with wave.open('sound.wav', 'wb') as wav:
    wav.setnchannels(1) # mono
    wav.setsampwidth(2) # 16 bit
    wav.setframerate(44100) # 44.1kHz

    frames = []
    for i in range(44100):
        t = i / wav.getframerate() # time in seconds
        sample = int(sin(t * 200 * 2 * pi) * 16000)
        frames.append(sample)

    data = array('h', frames)
    wav.writeframes(data)
    
```

### Sine
![](https://github.com/ual-cci/cp-sip/raw/master/images/sine.jpg)

### Square
![](https://github.com/ual-cci/cp-sip/raw/master/images/square.jpg)

### Noise
![](https://github.com/ual-cci/cp-sip/raw/master/images/noise.jpg)


---

## Sound in p5

p5 ships with a sound library.

Let's make an oscillator:

```js
let osc = null;

function setup() {
  createCanvas(400, 400);
  
  osc = new p5.SinOsc();
  osc.start();
}

function draw() {
  background(220);
  osc.freq(mouseX + 200);
}
```

---

## Envelopes

![](https://upload.wikimedia.org/wikipedia/commons/e/ea/ADSR_parameter.svg)

```js
let osc, envelope;

function setup() {
  createCanvas(710, 200);
  osc = new p5.SinOsc();
  osc.freq(440);

  envelope = new p5.Envelope();
  envelope.setADSR(0, 0.1, 0.1, 0.25);

}

function draw() {
  background(20);

  if (frameCount % 60 === 0) {
    osc.start();
    envelope.play(osc, 0, 0.1);
  }
}
```
