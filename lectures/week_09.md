## Computational Practices: Sound and Image Processing

Will Gallia
`w.gallia@arts.ac.uk`
Thursdays, 13:30 to 17:30

## Week 9
### Recursion

---

### Introduction

Recursion is a big thing in Computer Science. It's all about infite loops and things that appear in themselves. It's a wonderful topic.

It also appears in other areas such as Art and Biology.

The definition of recursion is slippery. This is what Wikipedia says:

> Recursion occurs when a thing is defined in terms of itself

There are lots of jokes about recursion, for example, the defintion of recursion might be:

**Recursion**
  See *Recursion*

You may or may not find this funny!

---

### Loose defintions

Recursion is about something being in itself, being in itself, being itself, being itself, being itself, being itself, being itself, being itself, being itself...

In art it's called the *Droste effect* or a *mise en abyme*:

![](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Droste_cacao_100gr_blikje%2C_foto_02.JPG/395px-Droste_cacao_100gr_blikje%2C_foto_02.JPG)


---

### In computing

In computing, you can't talk about recursion without talking about functions.

Recursion in software is:

> A function that's called in its own definition.

So something like:

```js
function sayHi() {
  print('hi!')
  sayHi()
}
```

What happens when we call `sayHi()`?

---

### We need to stop somewhere

As we've just seen, a recursive function will never return. It's just recurses forever. (Or depending on your programming languate, it crashes the program)

In order to do something useful with recursion we need to stop somewhere. This is called a *base case*.

The base case is some kind of `if` statement that stops us going into an infite loop.

---

### Concentric cicles

Say we want to create something like this:

![](https://github.com/ual-cci/cp-sip/raw/master/images/concentric.png)

We want to make a function that will draw concentric circles at a specified (x, y) point, an initial diameter and a gap between circles. So we want the function signature to look like:

```js
concentric(x, y, diam, gap)
```

We don't know ahead of time what the initial diameter or gap is going to be, so we need to use a loop to program this.

One implementation could look like:

```js
function concentric(x, y, diam, gap) {
  for (let d = diam; d > 0; d -= gap) {
    ellipse(x, y, d, d)
  }
}
```

Another implementation, using a different loop statement, could be:

```js
function concentric(x, y, diam, gap) {
  while (diam > 0) {
    ellipse(x, y, diam, diam)
    diam -= gap
  }
}
```

Both are equally valid. And there are more ways to do it!

---

### No loops just recursion

Now here's the mind blowing bit. A loop can be replaced with recursion.

Some programming languages don't have loops!

Here is a recursive definition of our `concentric()` function:

```js
function concentric(x, y, diam, gap) {
  if (diam > 0) {
    ellipse(x, y, diam, diam)
    concentric(x, y, diam - gap, gap)
  }
}
```

---

### Analysis

Let's make sure we understand what's going on.

We're going to call our function like this:

```js
concentric(200, 200, 350, 100)
```

So we draw four circles, like:

![](https://github.com/ual-cci/cp-sip/raw/master/images/concentric-few.png)

And we're going to pepper our function with a few `print()` statements:

```js
function concentric(x, y, diam, gap) {
  print('starting', diam)
  if (diam > 0) {
    print('drawing', diam)
    ellipse(x, y, diam, diam)
    concentric(x, y, diam - gap, gap)
  }
  print('ending', diam)
}
```

We print when we start running the function, when we are about the draw the circle and when we end.

This is what gets printed:

```
starting 350
drawing 350
starting 250
drawing 250
starting 150
drawing 150
starting 50
drawing 50
starting -50
ending -50
ending 50
ending 150
ending 250
ending 350
```

Notice how all the `ending`s are grouped at the end. We end finish the first function last!

It's like the program is going into itself, going deeper and deeper at each recursion.

Here I've indented the output, where each function invocation is intented:

```
starting 350
drawing 350
  starting 250
  drawing 250
    starting 150
    drawing 150
      starting 50
      drawing 50
        starting -50
        ending -50
      ending 50
    ending 150
  ending 250
ending 350
```
