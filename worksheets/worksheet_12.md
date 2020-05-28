## Week 12 worksheet

# Particles Systems II

Here is the code from the lecture:

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

Have a play with it and try to get an understanding of what's going on in the sketch.

Make changes to the hard coded values and get a feel for how they work.

Can you add some code so the particles get deflected, or repulsed from an object?

Can you neaten up the code so that the Particle class has methods like `moveTowards()` or something like that. So that the code in the main `draw()` function is much neater.
