## Computational Practices: Sound and Image Processing

Will Gallia
`w.gallia@arts.ac.uk`
Thursdays, 13:30 to 17:30

## Week 8
### Convolution and kernels

---

## Introduction

Convolution is a general signal processing technique, it can be used on images and also audio, to create reverb, for example. In this course, we'll just be looking at convolution in images.

In image processing, convolution is technique to filter images. The process involves *convolving* an image with a *kernel*. Classic effects like edge detection, blur and sharpen can all be achieved using the same underlying process.

---

## Kernels, but first matrices

What does kernel mean?

Before we start talking about kernels, we should know what a matrix is.

A matrix is a 2D array of numbers. There is a whole branch of maths that deals with matrices but we won't be going there!

A grayscale image with only one channel, is a matrix.

Sometimes in computing a matrix is actually a 2D array, and sometimes its a normal, 1D array but where you have to know the position of each index in 2D space. The `pixels` array in p5 is an example of this.

We'll be representing them as 2D arrays, because it makes life a bit easier.

---

## 2D arrays

A 2D array is an array of arrays. To be technically accurate, each element in the outer array should be an array of the same size. For example:

```js
let matrix = [
  [0, 1],
  [2, 3],
  [4, 5]
]
```

The outer length of this array is 3 and the inner length is 2. Because we're also talking about images when we use these, I might say that the matrix has a width of 2 and height of 3.

To make sense to us, the programmers, I laid out the about matrix in code as it looks when we use it. So, the outer list corresponds to the y position and the inner list to the x.

To get an an element of of the 2D array, you simply use the `[]` twice, e.g:

```js
let element = matrix[0][1]
```

At this point, `element` is equal to 1.

The x and y indices are in **reverse order** to the way we normally see them. Remember:

`matrix[<y_index>][<x_index>]`

#### Side note

In Javascript and Python, it's possible to have an array where each element is an array of different sizes:

```js
let things = [
  [0, 1],
  [2],
  [4, 5, 6]
]
```

This code is perfectly legal, but because the inner lists aren't the same length, it doesn't really count as a 2D array and certainly doesn't count as a matrix.


---

## Convolution & kernels for real

A kernel is a 2D matrix that's *convolved* with an image. In simple terms, each element of the kernel is multiplied by a pixel and the result of each of those multiplications is added together. The result becomes the value of the pixel we're interested in.

Lets take a 5 x 5 image to create a working example:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5-text-b.png)

The pixel we're interested in is highlighted in magenta.

Now, let's make a kernel and have symbols for each value:

```js
let identity = [
  [a, b, c],
  [d, e, f],
  [g, h, i]
]
```

Because our kernel has a size of 3 x 3, we need to get out the same section from the image:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5-text-bav.png)

As a matrix the pixels values we're interested in are:

```js
[
  [150, 182, 78],
  [129, 193, 158],
  [72, 172, 110]
]
```

The result of the convolution is going to where the value is `193` as that's the central pixel.

The convolution of this and the kernel is:

`150 * i + 182 * h + 78 * g + 129 * f + 193 * e + 158 * d + 72 * c + 172 * b + 110 * a`

You go though the image from top left to bottom right, and the kernel in **reverse** from bottom right to top left.

Here's an animation of the pairs that you multiply together:

![](https://github.com/ual-cci/cp-sip/raw/master/images/convolution-steps.gif)

You repeat this process for every pixel in the image, much like we did last week when we averaged pixels.

**Remember, when you're doing the convolution work on a copy of the image when you're reading pixels.** You don't want be writing and reading from the same pixels. A way you might want to get around this, is to read from the image pixels and write to the canvas pixels.

---

## Our first kernel

Let's get familiar with the simplest kernel, the identity:

```js
let identity = [
  [0, 0, 0],
  [0, 1, 0],
  [0, 0, 0]
]
```

As the name implies, this kernel does nothing to the image: what goes in is what comes out. It's like multiplying each pixel by 1. In fact, as you can see that' exactly what it does. It multiplies the central pixel by one and everything else by 0.

So, using this image:

![](https://github.com/ual-cci/cp-sip/raw/master/images/ripples.jpg)

The convolution of the identity kernel and the image is:

![](https://github.com/ual-cci/cp-sip/raw/master/images/ripples.jpg)

It's the same!

--

## More interesting kernels

A useful kernel is the edge detection kernel:

```js
let edge = [
  [-1, -1, -1],
  [-1,  8, -1],
  [-1, -1, -1]
]
```

The result looks like:

![](https://github.com/ual-cci/cp-sip/raw/master/images/ripples-edges.jpg)

Bright parts of the image how where the edges are. Specifically, this is points where the neighbouring pixels are different from each other.

This is an example of a high pass filter in an image. Pixels that have a big difference with the neighbouring pixels are increased, while pixels that are similar to their neighbours are decreased.

---

## Sharpen

Another interesting kernel is the the sharpen kernel:

```js
let sharpen = [
  [0, -1, 0],
  [-1, 5, -1],
  [0, -1, 0]
]
```

Which looks like this:

![](https://github.com/ual-cci/cp-sip/raw/master/images/ripples-sharpen.jpg)

---

## Blur

You can also produce a blur via averaging with convolution. The kernel looks like:

```js
let e = 1 / 9
kernel = [
  [e, e, e],
  [e, e, e],
  [e, e, e]
]
```

![](https://github.com/ual-cci/cp-sip/raw/master/images/ripples-blur.jpg)

Can you see why this produces an average?

---

## Implementation details

The `pixels` array in p5 is one list where RGBA values are next to each other. This can sometimes make life confusing if your just thinking about grayscale images.

If we know we're working with a grayscale image then we can just use the value of the red channel, as we know all the other channels are the same.

This means that can step through the `pixels` array in fours, going from red channel to red channel. This will move us from left to right through the image, going to the next row down when we reach the end of a row.

But, what is the index of a pixel directly above a given pixel? Say the current index is `i`, the index of the pixel directly above is `i - width * 4`. This is because we want to go back through the array by a whole row (and that's the `width`) and we multiply by 4 because there are four (R, G, B & A) channels.
