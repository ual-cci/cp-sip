## Week 7 worksheet

# Mosaics

For this session, you'll need an image to work with, it will make sense if you use a grayscale imag. You can find the image I used in the lecture, below and in [the GitHub repository](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate.jpg).

![](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate.jpg)

### Note

Even if you don't have a grayscale image, we'll be treating the images in this worksheet as grayscale. However all all images are represented as RGBA in p5, we'll simply be looking at the red channel to find the colour value of a pixel.

When I talk about colour, I'm talking about a value between 0 and 255, so techinically the luminance of a colour.

---

## The biggest window

Find the average colour of your **entire** image.

The average colour of my image, rounded to a whole number is `151`. Can you verify the same answer?


---

## A single colour image

Now can you paint the canvas the colour you found in the previous step?

How might you do this? There are simple ways and harder ways. It's up to you to go as low or high level as you like.

For my image the result is:

![](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate-whole-average.png)


---

## Starting a mosaic

We want to create a mosaic or pixelated effect. So we have squares of one colour making up the image.

A simple way to achieve this is to look at one pixel and paint a square the colour of that sample.

Step through your image by some amount (say 25 pixels) and colour squares based on the pixels colour at that point.

For my image I get:

![](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate-sample-mosaic-0.png)

This isn't great though, because depending on where you sample, you'll get quite different images. Here's an animation of the me sampling at different points:

![](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate-mosaic-samples.gif)

---

## Averaging over a window

Let's colour each square by the average colour of the window it paints over.

The way I do this is to have two nested loops, with one inside the other. The outer two loops go the (x, y) for the top left corner of the window and the inner two loops go through all the pixels in that window.

My result is:

![](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate-mosaic.png)


---

## Extensions

### Audio

Can you do the same thing with audio?

### Colour images

We've only used grayscale images so far, what would you do to create a pixelated effect with colour images? How would you treat the different colour channels?
