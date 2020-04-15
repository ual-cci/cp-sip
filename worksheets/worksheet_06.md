## Week 6 worksheet

# Filtering

For this session, you'll need an image to work with. You can find the image I used in the lecture, in [the GitHub repository](https://github.com/ual-cci/cp-sip/raw/master/images/frog.jpg).

---

## Getting started

Start a p5 sketch and display your image

Then experiment with p5's `filter()` and `tint()` functions. Try and work out what they are doing to your image.

Take a note that the outcome of these function depends on the placement in the code. E.g. `filter()` only affects drawings that happened before it was called.

---

## Going grayscale

Use `filter()` to make your image grayscale. Take a note of what it does to the image.

Now create a sketch to make your image grayscale, doing it manually by manipulating each pixel.

When you do this, create your own function called `myFilter()`, this should have a parameter just like `filter()`, so something like:

```js
function myFilter(type) {
	if (type == GRAY) {
		//
	}
}
```

Fill in this skeleton code with your own implementation.


Have a think about how you would go from RGB to grayscale. You might want to have a read on [Wikipedia](https://en.wikipedia.org/wiki/Grayscale) about it.

---

## Slide over

Now we want to achieve something like this:

![](https://github.com/ual-cci/cp-sip/raw/master/images/frog_to_gray.gif)

Conditionally apply the filter over a section of the image based on where the mouse is.

At this point you might want to change your filter to be something else, a threshold perhaps, or anything you like.

---

## Vignettes

Create a mask for vignette that looks a bit like:

![](https://github.com/ual-cci/cp-sip/raw/master/images/vignette_mask.jpg)

Remember, the way to do this is to have the colour of a pixel be related to its distance from some point. In my example, that point is at (100, 180)

Now multiply your make with the image, you should end up with something like:

![](https://github.com/ual-cci/cp-sip/raw/master/images/frog_vignette.jpg)

---

## Some colour

Finally bump up some of the colour channels to give it something special. Something like:

![](https://github.com/ual-cci/cp-sip/raw/master/images/frog_filtered.jpg)

In my example, instead of using the blue values from the image, I'm taking them from the vignette mask.

Experiment and come up with your own filter!
