## Computational Practices: Sound and Image Processing

Will Gallia
`w.gallia@arts.ac.uk`
Thursdays, 13:30 to 17:30, B501-03

## Week 7
### Low pass filters in images & audio

---

## Filter terminology

Given that both images and audio can be thought of as a mixture of frequencies, we can make filters that let through parts of these frequencies.

A high pass filter (HPF) lets through the high frequencies.

A low pass filter (LPF) lets through the low frequencies.

HPFs and LFPs have a *cutoff* frequency, this is the frequency at which you want to stop lower or higher frequencies.

For example, a HPF with a cutoff frequency of 500Hz will (ideally) not let any frequencies below 500Hz through.

In the real world, there is no such thing as a perfect filter.

---

## LPFs and HPFs in audio

We come across filters like in this with audio in our daily lives. For example, when you hear some talking next door, the wall is acting like a low pass filter, i.e. you hear low frequencies only.

This brings us to an interesting feature of sound, higher frequencies attenuate (get quieter) more, the further the sound travels.

That's why when you're trying to find that rave in woods, you hear the kick drum first...

The high pass filter is also used in the electronic music world quite often, it's usually found just before the "drop"

The cutoff is the parameter that you change with a filter.

---

## LPFs and HPFs in images

At this point, it's hard for us to think about filters for images in the same way as audio. So far, we've been thinking about filtering colour, and we do that by filtering each pixel's colour.

However, we can think about images in another way. We can think about how similar or different each neighbouring pixel is to each other. So we're thinking about the change in colour *across the image*.

To make life easier in this section, let's restrict ourselves and think only about a grayscale images, where there is only one channel (as opposed to R, G & B). So pixel can go from black to white.

Say we have the following image:

![](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate.jpg)

Here the image put through a low pass filter:

![](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate-lpf.png)

It's a blurry, so each neighbouring pixel is similar to each other.

Though a high pass filter, it's the opposite:

![](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate-hpf.png)

What comes out is only areas that are very different from each other


---

## Simplifying things

Making and using filters like in the previous slide is something that you'll be doing later in your degree. For now, let's strip things back, while getting very similar results.

Let's focus on the low pass filter.

We've seen that in images, a LPF creates blurry images. It doesn't matter how we achieve this blur, anything that is blurrier than it should be has been though a low pass filter!

An easy way to blur something is to average it.

When you draw line on a piece of paper, and then smudge it with your finger to make it blurry, you are distributing the graphite from the pencil over a greater surface area, averaging it out.

In both images and audio, we want to grab a bit of space or time and average out the samples across it.


---

## How do we find an average?

Given an array of numbers, how do you find the average?

The average is the sum of the array, divided by the length of the array.

In Javascript:

```js
let values = [1, 2, 3, 4, 5]

let sum = 0
for (let i = 0; i < values.length; i++) {
  sum+= values[i]
}

let average = sum / values.length
```

In Python:

```python
values = [1, 2, 3, 4, 5]

sum = 0
for v in values:
    sum += v

average = sum / len(values)
```

---

## The windowed or moving average

Using what we've just learned, we could find the average colour of an image. Which is nice, but doesn't really give us much an image back.

Make each pixel, or audio sample the average of itself and a few of its neighbours. We want to average over a *window*.

The size of this window is the cutoff for our filter, the greater the window the lower the cutoff.

Say we an array in Python:

```python
samples = [1, 2, 3, 4, 5, 6]
```

And we want to that though an moving average with a window size of 3. This means that for each sample we average, itself with its neighbour on each side.

If we made an `average()` function, our new array could look like:

```python
averaged = [
    average([1, 2, 3]),
	average([2, 3, 4)],
	average([3, 4, 5)],
	average([4, 5, 6)]
]
```

This is one way of doing it. Notice that the resulting array is now only 4 elements long, instead of the original 6. We've basically lost the values at either end of the array.

If we need to make sure the array is the same length as it was to begin with we could do something like:

```python
averaged = [
	average([1, 2]),
    average([1, 2, 3]),
	average([2, 3, 4)],
	average([3, 4, 5)],
	average([4, 5, 6)]
	average([5, 6)]
]
```

There is no silver bullet with this. The technique you choose to use depends on what you're doing. For images, you usually want to end up with the same size image, so you would go with the second option.

---

## Averaging audio

Here is the Python code for doing a moving average through an array:

```python
data = [1, 23, 43, 654, -234, 53] # ... some array of samples

length = len(data)
window = 4
for i in range(0, length - window):
	sum = 0
	for j in range(window):
		sum += data[i + j]

	average = int(sum / window)

	data[i] = average
```

Let's step through it:

```python
data = [1, 23, 43, 654, -234, 53] # ... some array of samples
```

Here we create an array, in reality you will have read this from a file or somewhere else and it will be many thousands of samples long.

```python
length = len(data)
window = 4
```

Create some variables, are window size is 4.

```python
for i in range(0, length - window):
```

Setup a for loop to go from 0 to the end minus the window size. This is so we don't go off the end of the array.

```python
	sum = 0
	for j in range(window):
		sum += data[i + j]
```

This is the main bit! Make a variable to start at 0 to keep track of the sum. Then make a loop for the window. Then add the sample at each point in the window. The current sample is the one at `i` and the one in the window is `i + j`.

```python
	average = int(sum / window)

	data[i] = average
```

Finally, calculate the average and store it back in the array


---

## Blurring an image

We can blur an image by averaging each pixel with it's neighbours, using the same technique we saw in the previous slide.

Say I have a 5 x 5 pixel image, which looks like this:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5-actual.png)

Ok, that's a bit small to look at! Let's make it a bit bigger:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5.png)

We want to put this through a 3 x 3 window averaging filter. This means that for every pixel ends up as the average of itself with all of its neighbours.

Here's the image with the values of each pixel:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5-text.png)

Let's walk thought the process of averaging. Let's take the pixel at location (3, 1), highlighted in magenta:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5-text-b.png)

Now let's highlight the window:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5-text-bav.png)

The pixels value is going to be the average of everything that's in the window, so:

```
(150 + 182 + 78 + 129 + 193 + 158 + 72 + 172 + 110) / 9
```

Now let's take a pixel that is on the edge somewhere, for example location (0, 1), highlighted in yellow below:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5-text-a.png)

The values we'll take into account are these:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5-text-aav.png)

So, that's pixel value will be:

```
(107 + 129 + 182 + 78 + 193 + 158) / 6
```

After running the average over the whole image, we would get:

![](https://github.com/ual-cci/cp-sip/raw/master/images/5x5-av.png)

---

## Implementation details

Because we want to find neighbouring pixels for each pixel, we need to have four, yes *4*, for loops. So a nested loop, inside a nested loop:

```js
let windowSize = 3
let radius = floor(windowSize / 2)

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // for each pixel
	let sum = 0
	let count = 0
	for (let j = -radius; j <= radius; j++) {
	  for (let i = -radius; i < radius; i++) {
	    let px = x + i
		let py = y + j
		if (px >= 0 && px < width && py >= 0 && py < height) {
	      sum += pixels[(px + py * width) * 4]
		  count += 1
		}
	  }
	}
	let average = sum / count

	let index = (x + y * width) * 4
	pixels[index] = average
	pixels[index + 1] = average
	pixels[index + 2] = average
  }
}
```

This can be quite tricky to think about. Let's break it down:


```js
let windowSize = 3
let radius = floor(windowSize / 2)
```

We create some variables for the window size. It only makes sense to have a window size of an odd number because we always have once central pixel.

```js
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    // for each pixel
	let sum = 0
	let count = 0
```

This is our first nested loop to iterate though each pixel in the image (or our canvas in this case). `x` and `y` refer to the position of the pixel we're going to write to, let's call this the target pixel.

It's at this point that we create two variables. One to hold the sum of the pixels as we move through and another to keep track of how many we have counted.

```js
	for (let j = -radius; j <= radius; j++) {
	  for (let i = -radius; i < radius; i++) {
	    let px = x + i
		let py = y + j
```

Next comes our second nested loop. This goes through all the neighbouring pixels. Notice the for loops go from `-radius` to, and including `radius`. We then make two variables to get the pixel coordinate of the pixel we're going to read from'

```js
		if (px >= 0 && px < width && py >= 0 && py < height) {
```

Then we check to see if this pixel is inside our image

```js
	      sum += pixels[(px + py * width) * 4]
		  count += 1
```

Then we add the pixel value to the sum and increase the count by 1. Here I'm just reading the red channel of the image, because I'm presuming the image is grayscale (so all channels will be the same).

```js
	let average = sum / count

	let index = (x + y * width) * 4
	pixels[index] = average
	pixels[index + 1] = average
	pixels[index + 2] = average
  }
}
```

Finally, I calculate the sum and write that result to all channels of the target pixel.

You can find a full sketch of the above in the `sketches` folder of the GitHub repository.

---

## Mosaic

A another process that's considered a filter in image processing is the *mosaic*. This looks a bit like:

![](https://github.com/ual-cci/cp-sip/raw/master/images/sea-gate-mosaic.png)

The process involves taking a grid of pixels and making them all the same colour. Think about how you would go about creating this effect.
