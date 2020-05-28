## Computational Practices: Sound and Image Processing

Will Gallia
`w.gallia@arts.ac.uk`
Thursdays, 13:30 to 17:30

## Week 12
### Particle systems & forces

---

Particle systems can get really interesting if we apply some physics to our world.

We know from last week that the way we update our position is by adding a velocity to it:

```js
position.add(velocity)
```

This however is only half of the story.

To more accurately model movement we have to also take into account acceleration.

---

### Acceleration

What is acceleration?

Velocity is the change in position over a given time period. It's the *rate of change* of our position.

Acceleration is the next step in this, it's the rate of change of our velocity.

Every frame, we add the acceleration to the velocity, and then we add the velocity to the position.

Here's a skeleton bit of code:

```js
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, 10, 10)
  }
}
```

---

### Newton's second law

#### F = m × a

In the real world, when we want to move something we apply a force to it.

Around 300 years ago, Isaac Newton worked out a bunch of laws to describe the way things move.

In our virtual world, we just want to apply forces to particles, and we can use the above formula to work out what the acceleration of the particle is going to be.

In the simplest case, we can say that each particle has a mass of 1. When start making more complicated particle systems, we'll give each particle a mass.

---

### Gravity

As you might know, gravity is defined as an acceleration. When something starts falling. In our atmosphere, there is air and this adds some resistance to things that are falling so they don't accelerate forever, they reach a fixed velocity, know as *terminal velocity*, which is effectively the maximum speed that something can fall.

If I drop an egg and a bowling ball from the top a building, both will hit the ground at the same time. But the force that they apply to the ground is quite different!

#### Programming gravity

Last week we did a bit of a hack with gravity, now we can do it more accurately.

We simply add a constant value to the acceleration:

```js
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    this.acc = createVector(0, 0)
  }

  apply(force) {
    this.acc.add(force)
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
	this.acc.set(0, 0)
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, 10, 10)
  }
}

let particle

function setup() {
  createCanvas(400, 800);
  fill(0)

  // create particle
  particle = new Particle(200, 10)

}

function draw() {
  background(255);

  // add a downward force
  particle.apply(createVector(0, 0.5))


  particle.update()
  particle.draw()
}
```

---

### Resetting acceleration

We have to be careful with acceleration. If you look closely at the code above, you'll see that we set acceleration to 0 after every update.

If we didn't do this then our velocity would explode! Because we would be increasing the acceleration every frame and that would be added the velocity every frame.

---

### Vectors

We have touched on vectors briefly, but now we're going to take bit of a deeper dive.

We are comfortable with having points at positions:

![](https://github.com/ual-cci/cp-sip/raw/master/images/points.png)

And we've been representing these points as vectors:

![](https://github.com/ual-cci/cp-sip/raw/master/images/points_pos.png)

So we can think of these vectors as arrows from the **origin** to the position of these points.

We can also do operations on vectors, for example:

![](https://github.com/ual-cci/cp-sip/raw/master/images/points_diff.png)

Subtracting A from B gives us the vector from A to B.

Now we are thinking of vectors slightly differently. Even though the above vector is drawn from A to B, techically it still starts from the origin, it's just that we're drawing it starting from A.

Mathematically what we're doing here is A + B - A, which = B, and that's why the end of the arrow is at B.

---

### Magnitude and direction

![](https://github.com/ual-cci/cp-sip/raw/master/images/points_length.png)

The magnitude of a vector is its length. In p5 we use the `mag()` method on Vectors to get their magnitude.

Sometimes we just want to know a direction of a vector, so we want to know which way it's pointing but we don't care about how long it is.

The process the get this vector is called normalization. In p5 we use the `normalize()` method to normalize a vector. (Note, this changes the original vector)

A normalized vector always has a length of 1.

---

### Attraction

We are now ready to create an attraction force to our particles. Here's the bit of code that might live in `draw()`:

```js
  let attractor = createVector(mouseX, mouseY)

  for (let particle of particles) {
    let force = p5.Vector.sub(attractor, particle.pos)
    force.normalize()
    force.mult(0.05)
    particle.apply(force)

    particle.update()
    particle.draw()
  }
```

Let's break it down a bit. First we create a point that we're going to attract the particles towards, this is a point at the mouse position.

Then we work out the vector from the particles position to the attractor:

`let force = p5.Vector.sub(attractor, particle.pos)`

Here we use `p5.Vector.sub()` because that takes two vectors as arguments and returns a new vector. We do this because we don't want change either the particle or the attractor's position.

Then we normalize this new vector:

`force.normalize()`

Then we multiply it by a small number

`force.mult(0.05)`

The reason we do this is just to keep the forces down so things don't go too wild. You will see this thing quite a lot with this kind of work, there will be quite a few of arbitrary numbers that keep the simulation looking nice.

Finally we apply this force to the particle:

`particle.apply(force)`


---

### Attraction by distance

You might want to multiply the attaction force by the distance between the attractor and the particle, so the further away the particle the faster it moves towards the attractor:

```js
let force = p5.Vector.sub(attractor, particle.pos)
let dist = force.mag()
force.normalize()
force.mult(dist * 0.005)
particle.apply(force)
```

Here we use the `mag()` method to find the length of the force vector before we normalize. This is equivalent to the distance between the two point. (Make sure you understand why)

---

### Constraining things

If you play with the above example for a while, you'll notice that as you move the mouse around, the particles will get faster and faster.

We might want to restrict their speed.

One way of doing this is to add some *damping*, by simply multiplying their velocity by a number less than 1.

So our update method might look like:

```js
  update() {
    this.vel.add(this.acc)
    this.vel.mult(0.99) // damping
    this.pos.add(this.vel)
    this.acc.set(0, 0)
  }
```

Here we multiply the velocity by 0.99, even though this might look like it would have no effect, it doesn't!

---

### Separation

One of the side effects of adding the damping like just did is that all the particles, tend to move over each other. We need a way to keep particles from getting too close.

To do this, just like last week, for each particle, we loop through all other particles and calculate a force that moves away from the other particles.

```js
for (let particle of particles) {

  for (let otherParticle of particles) {
    if (otherParticle != particle) {
      let d = p5.Vector.sub(particle.pos, otherParticle.pos)
      d.normalize()
      d.mult(0.03)
      particle.apply(d)
    }
  }

  particle.update()
  particle.draw()
}
```

Note the order of the arguments for `sub()`.

---

### Full code

Here is the full sketch:

```js
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(random(-1, 1), random(-1, 1))
    this.acc = createVector(0, 0)
  }

  apply(force) {
    this.acc.add(force)
  }

  update() {
    this.vel.add(this.acc)
    this.vel.mult(0.99)
    this.pos.add(this.vel)
    this.acc.set(0, 0)
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, 10, 10)
  }
}

let particles = []

function setup() {
  createCanvas(400, 400);
  fill(0)

  for (let i = 0; i < 25; i++) {
    let particle = new Particle(random(width), random(height))
    particles.push(particle)
  }
}

function draw() {
  background(255);
  noStroke()

  let attractor = createVector(mouseX, mouseY)

  fill(0)
  for (let particle of particles) {
    let force = p5.Vector.sub(attractor, particle.pos)
    let dist = force.mag()
    force.normalize()
    force.mult(dist * 0.005)
    particle.apply(force)

    for (let otherParticle of particles) {
      if (otherParticle != particle) {
        let d = p5.Vector.sub(particle.pos, otherParticle.pos)
        d.normalize()
        d.mult(0.03)
        particle.apply(d)
      }
    }

    particle.update()
    particle.draw()
  }
}
```
