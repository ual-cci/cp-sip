## Computational Practices: Sound and Image Processing

Will Gallia
`w.gallia@arts.ac.uk`
Thursdays, 13:30 to 17:30, B501-03

## Week 6
### Introduction to filters

---

## What is a filter

The term filter has many defintions, it's both a noun and verb.

Outside of computing you have probably already come across the term, e.g. a coffee filter.

You have probably also heard of Instagram filters.

And also Snapchat filters.

You might have also used a filter on a synthesizer.

And maybe a filter on the lens of your camera.

But what do these all have in common?

---

At the most basic level, a filter lets through some things and blocks others. This is obvious with the coffee filter, it lets though the coffee that's dissolved while blocking the powder.

But what about in sounds and images?

The important thing to understand is that sounds and images are mixtures of things. So a filter can blocks parts of this mixture.

A sound is a mixture of audio frequencies.

An image is a mixture of colours (frequencies of light)

---

## An aside (What are all these frequencies!)

I am talking about frequencies of audio and light, but let's not confuse ourselves.

What is the difference between sound and light?

---

## Background: sound

Sound is a vibration that moves through some medium, like air. We hear these vibrations when they are in the region of 20Hz to 20kHz. Typically as you get older you start to lose the ability to hear higher frequencies.

Remember, 1Hz means 1 full cycle per second.

Sound moves at a constant speed through air, what is that speed?

---

## Background: light

Light is an electromagnetic wave and sits in the middle of the electromagnetic spectrum:

![](https://upload.wikimedia.org/wikipedia/commons/c/cf/EM_Spectrum_Properties_edit.svg)

Here the oscillations are in electric and magnetic fields, so that's why light can travel through a vacuum and sound can't.

The frequencies of these oscillations for that we are able to see are roughly between 450 to 750THz.

Think about this for a second. The world that we see it just its representation in the visible spectrum. The electromagnetic spectrum contains lots of other bands, which we can't see, but contain lots of information.

WiFi, cellular, radio, etc all live in the spectrum.

Imagine what you would see if you could see other parts of the spectrum.


---

## Back to filtering

So as we now know that sounds and images are made from mixtures of frequencies, we can use a filter to remove some of those frequencies.

That's the simple definition.

But a filter can also enhance or amplify parts of a signal too.

Generally and very loosely speaking, a filter can be thought of something that takes something in, looks at that thing, does something to it and outputs that.

These days, with the advent of Instagram/Snapchat/etc. a filter encompasses much more. Pretty much anything goes!

---

## Filtering images

As you know when we deal with light in images, we don't deal with a frequency of light, but we work with and change the intensities of three channels: red, green and blue light.

---

## Loading an image in p5 and letting do some filtering

![](https://github.com/ual-cci/cp-sip/raw/master/images/frog.jpg)

p5 provides two ways to filter an image:

* `tint()`: which is more a classical filter
* `filter()`: more exciting image filtering

`tint()` gives us a way to filter the colours in an image

```js
let img

function preload() {
  // replace with your own image file
  img = loadImage('frog.jpg')
}

function setup() {
  createCanvas(400, 400)

  tint(255, 0, 0, 255)
  image(img, 0, 0)
}
```

If you want to use the image I'm using, you can find it in [the GitHub repository](https://github.com/ual-cci/cp-sip/raw/master/images/frog.jpg).

---

## Let's make our own colour filter

Using `tint()` is great, but let's do this ourselves.

Let's make the equivalent of `tint(255, 0, 0)`


```js
let img

function preload() {
  img = loadImage('frog.jpg')
}

function setup() {
  createCanvas(400, 400)

  img.loadPixels()
  for (let i = 0; i < img.pixels.length; i+= 4) {
	// what do we do here?
  }
  img.updatePixels()

  image(img, 0, 0)
}
```

---

## Going grayscale

Can you use `filter()` in p5 to make your image grayscale?

Using the same template from the last slide, can you do this manually?


---

## Some JS chops

```js
// let's make an array

let things = [1, 2, 3, 4, 5]

// say we want to get the first 3 elements out
// we could do:

let a = things[0]
let b = things[1]
let c = things[2]

// that works, but it's quite a lot of typing!

// with modern JavaScript we can do better:

let [a, b, c] = things

// nice! just let it unpack the array for us.

// what happens if we want to start from somewhere inside the array?
// then we can use slice() to get a section of the array

// the syntax is:
// array.slice(startIndex, endIndex) but not including endIndex
// so:

let [a, b, c] = things.slice(2, 5)

// will have a = 3, b = 4, c = 5

```

---

## Threshold

Sometimes its useful (and fun) to make an image a *binary image*, where a pixel is either white or black. This process is called thresholding.

There is no once accepted way to go from red, green & blue channels to either black or white.

What way would you use?

---

## Watch out!

Remember if you start with an image and you want to repeatedly do something to it, but always start from the original, you need to make a copy of it before you alter it.

We came across this last session when doing Conway's Game of Life (RIP John Conway, a victim of Covid-19)

An easy way to make a copy of an array in Javascript is using the `slice()` function, like:

```js
let imPixelsCopy

function setup() {
	imgPixelsCopy = img.pixels.slice()
}

function draw() {
	// e.g.
	img.pixels[0] = imgPixelsCopy[0] / mouseX

	//...
}
```

In a nutshell:

* Read from the copy: `imgPixelsCopy`
* Write to the original: `img.pixels`

---

## Moving to video

Video is just a sequence of images, so we can apply these same techniques to it.

Let's use p5 to stream video from our webcam.

```js
let capture;

function setup() {
  createCanvas(480, 480);
  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
  image(capture, 0, 0, width, width * capture.height / capture.width);
}
```

The `capture` object behaves in the same way as an image. So it also has a `pixels` array.

Let's do some filtering on the video!
