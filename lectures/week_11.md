## Computational Practices: Sound and Image Processing

Will Gallia
`w.gallia@arts.ac.uk`
Thursdays, 13:30 to 17:30

## Week 11
### Particle systems

---

Particle systems are the bread and butter of creative coder. There are countless examples of artworks and installations that use them.

Particle systems are also used a lot in VFX, where they can be used to simulate smoke and things like that.

The idea behind them is very simple. You program a *particle* with some behaviour and you create lots of them!

---

### What is a particle

A particle is some entity that exists in space. So in the simplest possible case a particle is just something that has a *position*.

```js
let particle = {
  x: 10,
  y: 10
}

ellipse(particle.x, particle.y, 10, 10)
```

It's not very exciting, and it's that's not yet a particle system, but in the simplest way it is a particle.

The next thing that particles do is *move*. The way we move particles is to repeated add a *velocity* to its position.

If the velocity is constant, then the particle will move at a constant speed:

```js
let velocity = {
  x: 0.2,
  y: 0.3
}

particle.x += velocity.x
particle.y += velocity.y
```

---

### Object-oriented programming

There are many ways to program a computer, each different way is known as a paradigm.

This is a big field in Computer Science and we're not going to delve too deeply, but just touch on some of the topic.

The way we have been programming so far, has been in the *procedural* paradigm. We've been writing programs that have and use functions. We call a function, perhaps have an if statement, call another function, etc.

When we do this we're basically executing **actions**, each function call is an action.

We have used data structures like arrays to store lists of things and objects/dictionaries to store multidimensional data or more complex bits of data.

An example of the *more complex bit of data* would be:

```js
let position = {
  x: 10,
  y: 20
}
```

However, when we need to do something to this object, we need to write some code that exists out of it, e.g.:

```js
position.x += 4
```

For example we could write a function to add one of our vectors to another one:

```js
function add(a, b) {
  a.x += b.x
  a.y += b.y
}
```

> As you know from our previous lecture, this is works because `a` is passed by reference and so is changed outside of the function's scope.

So, in the above code we are separating actions and data.

In the Object-oriented paradigm, we can combine these things. We write classes that combine **data & actions**

Let's start by writing the data part in a class:

```js
class Point {
  constructor(x, y) {
    this.x = x
	this.y = y
  }
}
```

This is a class definition, we use this to create objects. Specifically an object is an *instance* of a class.

Think of a class as a blueprint for an object.

> By convention class names start with an upper case character

We create an instance like:

```js
let point = new Point(10, 10)
```

Let's go through this bit of code.

`let point` is a normal variable declaration like we always have

`new Point(10, 10)` here were *constructing* a new object. This calls the constructor in the class definition. So it calls this code:

```js
  constructor(x, y) {
    this.x = x
	this.y = y
  }
```

Inside a class, the `this` variable refers to the object of that class. It refers to itself!

And with code like `this.x = x` we are creating new properties in the class on the fly.

So far we haven't really improved much on using a standard object/dictionary, let's add some actions to this class, we do this writing **methods**, which are simply functions defined inside the class.

```js
class Point {
  constructor(x, y) {
    this.x = x
	this.y = y
  }

  add(otherPoint) {
    this.x += otherPoint.x
	this.y += otherPoint.y
  }
}
```

We have just added the `add()` method, which adds the components of another point to our current point.

We would use it like:

```js
// create two instances
let a = new Point(10, 10)
let b = new Point(1, 2)

// call the method
a.add(b)
```

Think of the `.` like "go into", we call `add()` inside `a`.

Things are slightly different for us programmers, we can think of elements in our program as *things*, as nouns. Not just as actions, or verbs.

This is an extremely powerful concept.

The idea of putting all the logic of something inside a class is called encapsulation.

---

### Classes in p5: Vectors

We've just made a small class to store an (x, y) point, we called it `Point`. As this is a thing that gets used a lot in drawing environments like p5, there is an in-built class that does the same thing: `Vector`

The term vector comes from Maths and is used to describe something that has more than one dimension.

p5 gives us a class to store vectors and a helper function to create them:

```js
let position = createVector(10, 10)
let velocity = createVector(0.2, 0.3)

position.add(velocity)

ellipse(position.x, position.y, 10, 10)
```

Here we use `createVector()` to create a vector for us, and the arguments are the x and y coordinates. If you're working in 3D, you can also pass in a z coordinate.

We then use the `add()` method to add a vector to a vector. Under the hood, p5 is doing a component-wise addition for us (e.g. position.x += velocity.x, etc)

I'm not really sure why p5 encourages us to use `createVector()` instead of us calling the constructor, but it does!

---

### Making a system

The magic happens when you have lots of particles.

The easy extension to make this happen is to create an array for both position and velocity. Here's a full sketch:

```js
let positions = []
let velocities = []
let numParticles = 100

function setup() {
  createCanvas(400, 400);
  noStroke()
  fill(0)

  // create particles at the center of the canvas, with random velocities
  for (let i = 0; i < numParticles; i++) {
    let pos = createVector(width / 2, height / 2)
    let vel = createVector(random(-1, 1), random(-1, 1))
    positions.push(pos)
    velocities.push(vel)
  }
}

function draw() {
  background(255);

  for (let i = 0; i < numParticles; i++) {
    // draw particle
    ellipse(positions[i].x, positions[i].y, 10, 10)

	// update particle
    positions[i].add(velocities[i])
  }
}
```

This is OK, but there is a better way.

As we add more functionality to our particles the code is going to get difficult to read and write. Writing in the way we have above, mixes a lot of the program's logic.

In general, it's a good idea to keep things well contained when writing software. This helps us humans write and maintain the code.

---

### A particle class

Let's make a particle class:

```js
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
	this.vel = createVector(random(-1, 1), random(-1, 1))
  }

  update() {
    this.pos.add(this.vel)
  }

  draw() {
    noStroke()
	fill(0)
    ellipse(this.pos.x, this.pos.y, 10, 10)
  }
}
```

We would use it like:

```js
let particle

function setup() {
  createCanvas(400, 400)

  particle = new Particle(width / 2, height / 2)
}

function draw() {
  background(255)

  particle.update()
  particle.draw()
}

```

How neat is that?!

Notice how the `draw()` of the particle is different to the `draw()` of the main sketch. There is no name conflict here because each `draw()` belongs in a different scope.

The beauty of this approach is that when we make our particle more complicated we can put all that code inside the class, which means our main code doesn't get messy.


---

### Arrays of instances/objects

The final step is the have an array of objects. This is straight-forward, because an object is just like any other entity in our code.

```js
let particles = []

function setup() {

  for (let i = 0; i < 100; i++) {
    // create an instance
	let particle = new Particle(width / 2, height / 2)
	// add it to the list
    particles.push(particle)
  }
}

function draw() {

  for (let particle of particles) {
    particle.update()
	particle.draw()
  }
}
```

Notice how we use a `for of` loop to iterate through the particles, keeping things nice and neat.
