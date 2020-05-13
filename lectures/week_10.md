## Computational Practices: Sound and Image Processing

Will Gallia
`w.gallia@arts.ac.uk`
Thursdays, 13:30 to 17:30

## Week 10
### L-systems

---

### Introduction

L-systems bring together two things that aren't usually found in the same place: computers & biology.

They were created (and named after) a biologist called Aristid Lindenmayer, who was studying the growth of bacteria. He created L-systems to describe the growth of plants and other organisms.

They are a simple system that can be used to create lots of different and beatutiful results.

---

### An example

Let's start with an example of Lindenmayer's model of algae growth.

Say our algae is composed of two elements:

**A**, which for us looks like a red-ish circle:

![](https://github.com/ual-cci/cp-sip/raw/master/images/algae-a.png)

and, **B** which looks like a blue-ish circle:

![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-b.png)

Lindenmayer found that as the algae grew, A became A & B and B became A.

Visually:

![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-a-ab.png)

and

![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-b-a.png)

Finally, he said that the starting point for is A.

Here is what this model of growth might look like:

#### Step 0
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-0.png)
#### Step 1
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-1.png)
#### Step 2
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-2.png)
#### Step 3
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-3.png)
#### Step 4
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-4.png)
#### Step 5
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-5.png)
#### Step 6
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-6.png)
#### Step 7
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-7.png)
#### Step 8
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-8.png)
#### Step 9
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-9.png)
#### Step 10
![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-10.png)


As you can see there is a recursive nature to this. We use the output of one step as the input the next step.

---

### Formalising things

So there are three elements that define our system, we have:

* An alphabet: this is the list of available things that can exist in our system
* A set of rules: this describes what becomes what in each step, there might be one or many
* A start (aka axiom): a state that exists before we start iterating the system

People like to describe these succintly, so the above system can be described as:

**alphabet**: A, B
**rules**:
* A → AB
* B → A
**axiom**: A

That's it, what a neat way to describe a system!

---

### Programming things

It's nice to see things visually, but how do we implement this?

We treat the state of the system as a *string*. So, the state

![](https://github.com/ual-cci/cp-sip/raw/master/images/algea-3.png)

could be represented as

`ABAAB`

This makes it easy for us to iterate the system, because it's easy for us programmers to work with strings.

---

### Working with strings

As you know a string is a "string of characters". Or more simply an array of characters.

A few languages let you work on strings in a very similar way to the way you work on arrays. Some languages don't have a string type, just arrays of characters!

Javascript and Python both have flexible ways to work with strings.

#### Indexing

You can index strings like you would a array:

```js
let state = 'ABAAB'
let c = state[0]
// c == 'A'
```

and

```python
state = 'ABAAB'
c = state[0]
# c == 'A' too!
```

#### Iterating

This naturally flows into iterating over strings:

```js
for (let c of state) {
  print(c)
}
```

Will print:

```
A
B
A
A
B
```

Python too:

```python
for c in state:
    print(c)
```

Notice in Javascript we use the `of` operator to loop over arrays.


#### Concatenation

Both languages also support the `+` character for concatenation of strings:


```js
let hi = 'hi'
let there = 'there'
let messsage = hi + ' ' + there
```

This extends to addition assignment:

```js
let message = 'hi'
message += ' there'
```

You might find it awkward to be "adding" strings together, or this may come naturally. Either way, it's just the character that the designers of the language chose to do this operation. Again, not all languages are like this.

---

### Context switch

Now for something totally different!

---

### Turtle graphics

Drawing algae as circles is OK, but we can draw much more exciting things with L-systems. However, to do this, we have to draw in slightly different way the way we normally do.

p5 gives us a very rich way to draw graphics (`ellipse()`, `translate()`, etc..), but things could be simpler.

Imagine if all you had was the ability to move forwards and to turn. And wherever you went you drew a line.

This is called *Turtle graphics* and there's a very old programming environment called LOGO that implemented it.

```
fd 100
rt 120
fd 100
rt 120
fd 100
```

Draws a triangle, `fd` means move forward and `rt` means turn right, and the expects the angle in degrees.

LOGO also gives you a way to do loops:

```
repeat 3 [
  fd 100
  rt 120
]
```

Also draws a triangle.

---

### Turtle graphics in p5

We can create our own turtle graphics in p5. We do this by changing the coordinate system on the fly.

We do this by using the `translate()` and `rotate()` functions.

`translate()` moves the origin of the coordinate system to a specified point. It's does this relative to the current coordinate system.

`rotate()` rotates the coordinate system by a given angle (in radians). Or by degrees if you call `angleMode(DEGREES)`

The trick with making turtle graphics in p5 is to move the origin to the end point of wherever we draw to, and always to start drawing from the origin. Like:

```js
line(0, 0, 100, 0)
translate(100, 0)
```

To draw a triangle:

```js
line(0, 0, 100, 0)
translate(100, 0)
rotate(radians(120))
line(0, 0, 100, 0)
translate(100, 0)
rotate(radians(120))
line(0, 0, 100, 0)
translate(100, 0)
```

And of course we can use a loop too:

```js
for (let i = 0; i < 3; i++) {
  line(0, 0, 100, 0)
  translate(100, 0)
  rotate(radians(120))
}
```
