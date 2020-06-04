## Computational Practices: Sound and Image Processing

Will Gallia
`w.gallia@arts.ac.uk`
Thursdays, 13:30 to 17:30

## Week 13
### Flocking

---

### Introduction

We can build on our particle systems to create more organic looking systems.

In 1986 Craig Reynolds developed a computer model of groups of animals, like bird flocks and schools of fish.

He published this in a [paper in 1987](http://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/) and this became the defacto way model flocking ever since.

![](http://www.cs.toronto.edu/~dt/siggraph97-course/cwr87/cwr87p2.gif)

Even though this was built on computers with limited processing power, and the graphics look bad by today's standards, the underlying model is still as sound as it ever was.

---

### Flocking & boids

Unsurprisingly we use the term *flock* for a group of objects that we're modelling.

What comes more of a surprise is that Reynolds calls each object in his model a *boid*.

Another term for this kind of model is: Agent based modelling. Where the idea is that you model the behaviour of one *agent* (i.e. bird, fish, boid, whatever!) and that's it.

This is a powerful concept and one that you might have come across in your non-virtual lives. Flocks, or crowds of people have a behaviour in themselves, which might not be obvious when you just look at things on an individual scale.

---

### Reynolds' rules

Reynolds' key insight was that he came up with three rules that each boid in the system should follow.

These are also called steering behaviours, because they tell the boid which way to go.

The rules are:

- Separation
- Cohesion
- Alignment

---

### Separation

The idea here is that agents shouldn't get too close to each other. This makes sense, in a real world flock, birds don't crash into each other.

We covered this concept last week with our particle system. The idea is to apply a force away from our neighbours.

![](https://upload.wikimedia.org/wikipedia/commons/e/e1/Rule_separation.gif)

However, when we did it we applied this force from all other particles in the system.

A key feature of Reynolds' model is that we only account for boids that are within some **radius of influence**. So we don't calculate things for boids that are far away from us.

---

### Cohesion

This is the pretty much the opposite to separation. The idea is that we want our agents to stay close to each other, i.e. form a flock!

To have some cohesion we try to move a boid to the average point of itself and it's neighbours.

![](https://upload.wikimedia.org/wikipedia/commons/2/2b/Rule_cohesion.gif)

---

### Alignment

This is quite different to the other two rules. Whereas separation and cohesion are based on position, alignment is about a boid's velocity.

I idea here is that we want the flock to move in a **common direction**.

![](https://upload.wikimedia.org/wikipedia/commons/e/e1/Rule_alignment.gif)

---

### Implementation

Daniel Shiffman's excellent book The Nature of Code, has a great [https://natureofcode.com/book/chapter-6-autonomous-agents/](chapter on flocking).

The code in his examples are written in Processing so the syntax is slightly different than p5, but the concepts described in the book are done so very well.

There is an [example sketch](https://p5js.org/examples/simulate-flocking.html) on flocking on the p5 website, which is a p5 port of Shiffman's original Processing code. However it uses old Javascript styles and things we haven't covered in this course, so I have modified this sketch to be a bit friendlier for us:

```js
let boids = []

function setup() {
  createCanvas(500, 500)

  for (let i = 0; i < 100; i++) {
    let boid = new Boid(width / 2, height / 2)
    boids.push(boid)
  }
}

function draw() {
  background(51);

  for (let boid of boids) {
    boid.update(boids)
    boid.draw()
  }
}


class Boid {
  constructor(x, y) {
    this.acc = createVector(0, 0)
    this.vel = createVector(random(-1, 1), random(-1, 1))
    this.pos = createVector(x, y)
    this.r = 3.0
    this.maxSpeed = 3
    this.maxForce = 0.05
  }

  apply(force) {
    this.acc.add(force)
  }

  update(boids) {
    let sep = this.separate(boids)
    let ali = this.align(boids)
    let coh = this.cohesion(boids)
    // Arbitrarily weight these forces
    sep.mult(3.5)
    ali.mult(1.0)
    coh.mult(1.0)
    // Add the force vectors to acceleration
    this.apply(sep)
    this.apply(ali)
    this.apply(coh)

    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)


    // wrap the boids around the canvas
    if (this.pos.x < -this.r) {
      this.pos.x = width + this.r
    } else if (this.pos.x > width + this.r) {
      this.pos.x = -this.r
    }

    if (this.pos.y < -this.r) {
      this.pos.y = height + this.r
    } else if (this.pos.y > height + this.r) {
      this.pos.y = -this.r
    }
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos)
    desired.normalize()
    desired.mult(this.maxSpeed)
    let steer = p5.Vector.sub(desired, this.vel)
    steer.limit(this.maxForce)
    return steer
  }

  draw() {
    let theta = this.vel.heading() + radians(90)
    fill(127)
    stroke(200)
    push()
    translate(this.pos.x, this.pos.y)
    rotate(theta)
    beginShape()
    vertex(0, -this.r * 2)
    vertex(-this.r, this.r * 2)
    vertex(this.r, this.r * 2)
    endShape(CLOSE)
    pop()
  }

  separate(boids) {
    let desiredSeparation = 25.0
    let steer = createVector(0, 0)
    let count = 0

    for (let boid of boids) {
      if (this != boid) {
        let d = p5.Vector.dist(this.pos, boid.pos)
        if (d > 0 && d < desiredSeparation) {
          let diff = p5.Vector.sub(this.pos, boid.pos)
          diff.normalize()
          diff.div(d) // Weight by distance
          steer.add(diff)
          count++ // Keep track of how many
        }
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count)
    }

    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize()
      steer.mult(this.maxSpeed)
      steer.sub(this.vel)
      steer.limit(this.maxForce)
    }
    return steer
  }

  align(boids) {
    let neighbourDist = 50
    let sum = createVector(0, 0)
    let count = 0

    for (let boid of boids) {
      if (this != boid) {
        let d = p5.Vector.dist(this.pos, boid.pos)
        if (d < neighbourDist) {
          sum.add(boid.vel)
          count++
        }
      }
    }

    if (count > 0) {
      sum.div(count)
      sum.normalize()
      sum.mult(this.maxSpeed)
      let steer = p5.Vector.sub(sum, this.velocity)
      steer.limit(this.maxforce)
      return steer
    } else {
      return createVector(0, 0)
    }
  }

  cohesion(boids) {
    let neighborDist = 50
    let sum = createVector(0, 0)
    let count = 0

    for (let boid of boids) {
      if (this != boid) {
        let d = p5.Vector.dist(this.pos, boid.pos)
        if (d < neighborDist) {
          sum.add(boid.pos)
          count++
        }
      }
    }

    if (count > 0) {
      sum.div(count)
      return this.seek(sum)
    } else {
      return createVector(0, 0)
    }
  }
}
```

---

### Implementation details

#### Steering

Let's go through this notion of steering. Here's a snipped of code from the sketch:

```js
steer.normalize()
steer.mult(this.maxSpeed)
steer.sub(this.vel)
steer.limit(this.maxForce)
```

`steer` is a vector that starts of as the direction we want to go. Here's an explanation for the 4 lines:

1. We normalize so we just get a direction
2. We multiply this by a set maximum speed
3. We subtract this direction from our current velocity. This is so our new direction is a mixture of where we want to go and where we're currently going
4. We limit this new direction so that we adjust the amount of steering we do

Here's a small sketch that demonstrates this. Play with `maxSpeed` and `maxForce` and get a feeling for what they do.

```js
class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(random(-1, 1), random(-1, 1))
    this.acc = createVector(0, 0)
    this.maxSpeed = 1
    this.maxForce = 1
  }

  apply(force) {
    this.acc.add(force)
  }

  update() {
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
	this.acc.set(0, 0)
  }

  seek(target) {
    let steer = p5.Vector.sub(target, this.pos)
    steer.normalize()
    steer.mult(this.maxSpeed)
    steer.sub(this.vel)
    steer.limit(this.maxForce)
    this.apply(steer)
  }

  draw() {
    ellipse(this.pos.x, this.pos.y, 10, 10)

    let dir = this.vel.copy()
    dir.mult(25)
    line(this.pos.x, this.pos.y, this.pos.x + dir.x, this.pos.y + dir.y)
  }
}

let particle

function setup() {
  createCanvas(400, 400);
  particle = new Particle(200, 200)
}

function draw() {
  background(220);

  if (mouseIsPressed) {
    particle.seek(createVector(mouseX, mouseY))
  }

  particle.update()
  particle.draw()
}
```

#### Average positions

Here's a sample sketch that illustrates where the average point of a group of points inside a radius of influence.

![](https://github.com/ual-cci/cp-sip/raw/master/images/points-average.png)

You can create point at the mouse position when you press a key and you can also drag points.

```js
let points = []
let selectedPoint = null
let size = 10
let influenceRadius = 100;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 10; i++) {
    points.push(createVector(random(width), random(height)))
  }

  // let the first point be our selected one to begin with
  selectedPoint = points[0]
}

function draw() {
  background(255)
  noStroke()

  for (let point of points) {
    if (point == selectedPoint) {
      fill(0, 255, 0)
    } else {
      fill(0)
    }
    ellipse(point.x, point.y, size, size)
  }

  fill(0, 255, 255, 50)
  ellipse(selectedPoint.x, selectedPoint.y, influenceRadius * 2, influenceRadius * 2);

  // average
  let sum = createVector(0, 0)
  let count = 0

  for (let point of points) {
    let d = p5.Vector.dist(point, selectedPoint)
    if (d < influenceRadius) {
      sum.add(point)
      count++
    }
  }
  let average = sum.div(count)
  fill(255, 0, 0)
  ellipse(average.x, average.y, 5, 5)
}

function mousePressed() {
  let rad = size / 2
  for (let point of points) {
    if (dist(mouseX, mouseY, point.x, point.y) < rad) {
      selectedPoint = point
      break
    }
  }
}

function mouseDragged() {
  if (selectedPoint) {
    selectedPoint.x = mouseX
    selectedPoint.y = mouseY
  }
}

function keyPressed() {
  points.push(createVector(mouseX, mouseY))
}
```
