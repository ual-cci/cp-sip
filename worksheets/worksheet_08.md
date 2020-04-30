## Week 8 worksheet

# Convulution

In this session we'll be writing functions to filter images using convolution.

As run-up to next week's session, there will be a heavy emphasis on writing functions and trying to write reusable code.

As per the last few sessions, you'll need an image for this. You can find the image I used in the lecture, below and in [the GitHub repository](https://github.com/ual-cci/cp-sip/raw/master/images/ripples.jpg).

![](https://github.com/ual-cci/cp-sip/raw/master/images/ripples.jpg)

---

## A skeleton

Here's a skeleton to get started with:

```js
let ripples

function preload() {
  ripples = loadImage('ripples.jpg')
}

function setup() {
  createCanvas(400, 400);

  // edge detection
  let kernel = [
    [-1, -1, -1],
    [-1,  8, -1],
    [-1, -1, -1]
  ]

  ripples.loadPixels()
  loadPixels()

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let index = (x + y * width) * 4
      let result = 0

      // add code here to perform the convolution for this pixel

      pixels[index] = result
      pixels[index + 1] = result
      pixels[index + 2] = result
      pixels[index + 3] = 255

    }
  }
  updatePixels()
}
```

Fill in the skeleton to do the convolution. You will need to write 9 lines of code, one for each multiplication of a kernel element and a pixel, adding it to `result` as you go.

---

## More modular

The above code is fine, but it isn't resuable. What happens if `ripples` isn't the same size as the canvas? What happens if you change the size of the kernel?

What we want to end up with a very keen sketch, that looks like:

```js
let ripples
let kernel = [
  [-1, -1, -1],
  [-1,  8, -1],
  [-1, -1, -1]
]

function preload() {
  ripples = loadImage('ripples.jpg')
}

function setup() {
  createCanvas(400, 400);

  let filteredRipples = convolve(ripples, kernel)
  image(filteredRipples, 0, 0)
}
```

So we want to write a function called `convolve()` that takes an image and a kernel as inputs and produces a filtered image.

We're going to build up to this, writing small functions as we go.

First, let's break down what we want our `convolve()` function to do:

1. Create a new image that is the same size as the `img` parameter
2. Prepare the pixels for the both images
3. Loop through the *valid* pixels in the image and perform the convolution
4. Store the result in the output image
5. Return the output image

---

## Creating an image

See the [createImage](https://p5js.org/reference/#/p5/createImage) documentation to see how you an create an image.

Write a function called `convolve()` that creates an image, let's call this the output image.

Write your function so it returns the output image.

---

## Loop through

Now build on your `convolve()` function and add a nested loop to go through all the valid pixels in the input image.

For now, just copy the values in the input image to the newly created output image.

At this point you should see the the original image in your sketch.


---

## Do the convolution

Replace the copying code you wrote in the previous step with the code to do the convolution. At this point, you could presume that the kernel is 3 x 3 elements.

---

## Any size of kernel

Improve your code to allow you to use any size of kernel.
