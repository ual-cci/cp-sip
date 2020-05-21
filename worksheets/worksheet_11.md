## Week 11 worksheet

# Particles Systems I

### First step

First create a very simple particle system, where each particle has a position and a velocity. Every frame add the velocity to the position, so the particle moves around the canvas.

Make sure you:

* Write a class to represent your particle
* Have `draw()` and `update()` methods where the class logic lives
* Give your particle a random velocity

Create an array of say, 100 particles. Your result should look something like:

![](https://github.com/ual-cci/cp-sip/raw/master/images/particles.png)

### Edges

At the moment all the particles gradually dissapear. Keep them on the canvas by either:

* Bouncing the particles off the edges of the canvas

or

* Wrapping the position of the particles, so if they dissapear off the right of the canvas they appear on the left and vice versa.

### Gravity

Perhaps you'd like to have some gravity-like effect? We'll be going over forces properly next week, but for now just add some constant velocity in the down direction.

### Bouncing off each other

Can you get the particles to bounce off each other?
