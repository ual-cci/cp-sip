class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.vel = createVector(random(-1, 1), random(-1, 1))
    this.diam = random(15, 30)
    this.colour = random(0, 200)
  }

  update() {
    // move ourselves
    this.pos.add(this.vel)
    let rad = this.diam / 2


    if (this.pos.x <= rad || this.pos.x >= width - rad) {
      this.vel.x = -this.vel.x
      // same as
      // this.velocity.x *= -1
    }
    if (this.pos.y <= rad || this.pos.y >= height - rad) {
      this.vel.y *= -1

    }
  }

  bounce(particles) {
    this.over = false
    for (let otherParticle of particles) {
      if (otherParticle != this) {
        let d = this.pos.dist(otherParticle.pos)
        if (d < (this.diam + otherParticle.diam) / 2) {
          let temp = otherParticle.vel.copy()
          otherParticle.vel = this.vel
          this.vel = temp
        }
      }
    }
  }

  draw() {
    noStroke()
    fill(this.colour)
    ellipse(this.pos.x, this.pos.y, this.diam, this.diam)
  }
}

let particles = []

function setup() {
  createCanvas(400, 400)

  for (let i = 0; i < 15; i++) {
    let particle = new Particle(random(30, width - 30), random(30, height - 30))
    particles.push(particle)
  }
}

function draw() {
  background(255)

  for (let particle of particles) {
    particle.bounce(particles)
    particle.update()
    particle.draw()
  }
}
