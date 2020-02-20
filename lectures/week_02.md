## Computational Practices: Sound and Image Processing

Will Gallia  
`w.gallia@arts.ac.uk`  
Thursdays, 13:30 to 17:30, B501-03

## Week 2
### Making waves & shapes with trigonometry

---

## Last week recap

> There are 10 types of people in the world, those who understand binary and those who don't

* What are binary numbers?
* Why 255?
* How are the p5 `pixels` arranged?

---

## Introduction

### Our best friend: sine

![](https://upload.wikimedia.org/wikipedia/commons/d/d2/Sine_one_period.svg)

It's a function of an angle, for any angle it returns a value between -1 and 1

It's not just about geometry, it's also the building block for audio (or any signal). It's a pure frequency, what does that sound like?

All sounds, no matter how long, are the sum of sine waves at different frequencies and phases (Fourier analysis).

---

## Back to school

What do we know about trigonometry already?

* SOHCAHTOA?
* Some Of Her Children Are Having Trouble Over Algebra?
* She Offered Her Cat A Heaping Teaspoon Of Acid?

What was the context in which you learnt this stuff?

--- 

## Definitions

Trigonometry is the study of triangles, their sides and angles.

As you probably know from school: 

`sin(theta) = opposite / hypotenuse`  
`cos(theta) = adjacent / hypotenuse`

Here, we'll be taking a slightly different approach, which brings us to the same result.

### The unit circle:

![](https://upload.wikimedia.org/wikipedia/commons/8/8f/Unit_circle.svg)

A circle with a radius of 1, with its center at the origin.

If we take a point on the circle, say (a, b) and an angle between the x axis and this point, say t(, then:

`a = cos(t)`  
`b = sin(t)`

Can you see the triangle inside the circle? We are back to our school definition, only the hypotenuse is 1.

--- 

## Degrees & radians

> Is you calculator to "degrees"?

We normally think about angles in degrees, denoted by °. A full rotation is defined as 360°. Why 360 and not 255?!

Degrees are nice for us humans to work with, but the choice of 360 is somewhat arbitrary. Is there a number that is baked into the fabric of the universe?

What is the circumference of the unit circle?

We know that the circumference of a circle is: 2πr

So we can say a full rotation is 2πr, and we can use this unit as an angle. These are known as radians.

Computers don't have a dedicated degrees and radians mode! Trigonometric functions always take angles as radians.

In p5, you can easily convert between radians and degrees using the `radians()` and `degrees()` functions.

---

## Drawing a sine wave

```js
function setup() {
  createCanvas(400, 400);
  strokeWeight(3);
  background(250);
}

function draw() {
  translate(0, height / 2);
  scale(1, -1);

  let theta = map(mouseX, 0, width, 0, TWO_PI);
  let y = sin(theta) * 100;
  point(mouseX, y);
}
```

Move your mouse across the canvas.

Why are we using `translate()` and `scale()`?

Why are we using `map()`, what does it do?

Instead of drawing a sine wave, can you draw a circle?

---

## Getting to know our friend

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/6c7ac13130e7d34a143d729920378bb1902ce74f)

* **t** t is a point in time (or anything)
* **A** is the amplitude
* **f** is the frequency
* **φ** (phi) is the phase

In plain English, if we refer to the function as a 'wave':

* The frequency is how quickly the wave cycles
* The amplitude is the height of the wave
* The phase is the offset of the wave

Have an explore:

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250);

  translate(0, height / 2);
  scale(1, -1);
  
  let amplitude = 10;
  let frequency = 1;
  let phase = 0;
  
  beginShape();
  for (let x = 0; x < width; x+= 2) {
    let t = x / width; // between 0 and 1
    let y = sin(2 * PI * frequency * t + phase) * amplitude;
    vertex(x, y);
  }
  endShape();
}
```

Substitute `mouseX` or something interactive into the values of `amplitude`, `frequency` and `phase` so you can see for yourself what these parameters do.

Try using `frameCount` to animate the wave.

--- 

## Things to note

The amplitude determines the *height* of the wave. The difference between the top and the bottom of the peaks, is always double the amplitude.

The frequency is how fast the wave cycles. In p5 if you crank up the frequency you might notice that it suddenly drops down. This is phenomenon is known aliasing and is caused by sampling the wave at discrete points.

The phase is a shift, or offset in the wave. Because the wave is periodic, the values for phase are essentially modulo 2π


---

## Programming exercise

Last week we wrote our own `background()` function in p5.

Now can you write your own `ellipse()`?

---

## Space and time

Sine functions are also great used over time, hopefully you've had some experimentation with this.

Things get very interesting when you use sine & cosine over space *and* time. 

```js
function setup() {
  createCanvas(400, 400);
  fill(255);
  noStroke();
}

function draw() {
  background(30);
  translate(width / 2, height / 2);

  let ratio = frameCount * 0.01;

  for (let i = 0; i <= 360; i += 4) {
    let theta = radians(i * ratio);
    let x = cos(theta) * i / 3;
    let y = sin(theta) * i / 3;
    ellipse(x, y, 3, 3);
  }
}
```

