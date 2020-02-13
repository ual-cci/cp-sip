## Computational Practices: Sound and Image Processing

Will Gallia `w.gallia@arts.ac.uk`  
Thursdays, 13:30 to 17:30, B501-03

---

## High level course overview

**Lots of programming!**

* Data representation and specifically images and audio
* Types of image (raster vs vector)
* Geometry (with a view to synthesis)
* Data manipulation techniques (for media)
* Analysis techniques

---

### We want to make art with computers

We need to answer these questions:

* What do we want to make?
* What tools are available to us?
* How do we work with these tools to get what we want?

There are lots of options out there.

If we can't find what we want, we might make our own. But also, reinventing the wheel is a great way to learn.

---

## Style

These sessions will be informal with lots of discussion.

Lots of code examples and programming together.

Who are we and what do we want to get out of this course?

---

## Terms

In the context of computing, can you define these and give examples?

* High level vs Low level
* Representation
* Synthesis
* Analysis
* Manipulation

---

## The RGB colour space

When working on a computer screen we work with an additive colour system. The RGB colour space is the standard space we worth with when making images on a computer.

**RGB cube demo**

Every pixel is represented by a red, green and blue channel. Sometimes there's an extra channel for the opacity, known as alpha.

---

## Colour representation

p5 boilerplate:

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);
}
```

Why 255?

What is a canvas?

---

## Bits & bytes

A bit or *binary digit* is the fundamental unit in computing.

What is a bit?  
Why are computers all about bits?  
What are the implications of this?  
Any examples if this, or consequences of this?

What happens when you put a load of bits together?

A byte is 8 bits, considered as one entity or one number.

In modern computers everything is stored as one or more bytes.

Let's think about this for a while.

---

## A canvas

At a low level, a canvas (or image) is simply an array of red, green, blue and maybe alpha values.

The arrangement of these may depend on the platform, but the configuration in p5 is:

`[r1, g1, b1, a1, r2, g2, b2, a2, ...]`

---

## Manually drawing a background

What does this code do?

```js
function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  loadPixels();

  for (let i = 0; i < width * height * 4; i+= 4) {
    pixels[i + 3] = 255;
  }

  updatePixels();
}
```

Let's make our own background function.  
Let's make some a more *interesting* background function!

---

## Going lower

**Portable pixmap format**

> The PPM format is a lowest common denominator color image file format.

[https://en.wikipedia.org/wiki/Netpbm](https://en.wikipedia.org/wiki/Netpbm)

```python
from array import array

width, height = 16, 16
channels = 3
pixels = array('B', [0] * width * height * channels)
    
for ri in range(0, len(pixels), channels):
    pixels[ri] = 255

with open('red.ppm', 'wb') as f:
    f.write(f'P6\n{width} {height}\n255\n'.encode())
    pixels.tofile(f)
```

---

## What about vector formats?


