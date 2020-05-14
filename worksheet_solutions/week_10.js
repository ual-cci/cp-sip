let rules = {
  A: 'B-A-B',
  B: 'A+B+A'
}

function render(sequence, lineLength, angle) {
  for (let char of sequence) {
    if (char == 'A' || char == 'B') {
      line(0, 0, lineLength, 0)
      translate(lineLength, 0)
    }
    else if (char == '+') {
      rotate(-angle)
    }
    else if (char == '-') {
      rotate(angle)
    }
  }
}

function iterate(sequence, rules) {
  let output = ''
  for (let char of sequence) {
    if (char in rules) {
      output += rules[char]
    }
    else {
      output += char
    }
  }
  return output
}

function setup() {
  createCanvas(400, 400)

  translate(20, height - 20)

  let seq = 'A'
  let n = 6
  for (let i = 0; i < n; i++) {
    seq = iterate(seq, rules)
  }

  let sideLength =  320 / Math.pow(4, n / 2)
  render(seq, sideLength, radians(60))
}
