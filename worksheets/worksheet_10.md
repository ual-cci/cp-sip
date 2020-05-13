## Week 10 worksheet

# L-systems

Have a look a the [Wikipedia page on L-systems](https://en.wikipedia.org/wiki/L-system), scroll down to the examples and pick one that you'd like to implement.

You can do which every one you want, but we will have a vote in class for me to choose which one I do myself so you can also do that one if you want. However, as you will see, it's very easy to replace different systems once you have the general framework up and running.

---

## Drawing

Let's start by making our Turtle graphics drawing system.

Write a function to draws a program that's encoded as a string.

So for example: `A-A-A`, where `A` means move forward 100 and `-` means turns right 120 degrees. So `A-A-A` would produce a triangle.

Verify your program works.

If you're feeling fancy, you might want to create a function that has parameters for the amount that it moves and turns, that way you'll be able to apply to lots of L-systems.

---

## Rewriting

Now let's turn our attention to rewrite rules. Write a function that takes a string as an input and returns a new string which has been transformed as per the rules of your system.

E.g. If your system says `A → B-A-B` then replace each `A` with `B-A-B`.

Think about a nice way of doing this. I went though a good technique in last week's lecture.

---

## Putting it all together

Combine the two above steps and draw your L-system!
