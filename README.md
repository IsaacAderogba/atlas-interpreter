- [Atlas Interpreter](#atlas-interpreter)
  - [Installation](#installation)
  - [Usage](#usage)

# Atlas Interpreter

This is an accompanying repo for the course [Essentials of Interpretation](https://www.udemy.com/course/essentials-of-interpretation/).

It's part of a larger goal on designing my own programming language called Atlas.

## Installation

Clone this project

```sh
> git clone https://github.com/IsaacAderogba/atlas-interpreter.git
```

<br />
From the project directory, give the `atlas` binary execution rights:
```sh
> chmod +x bin/atlas
```

## Usage

The Interpreter can now evaluate any [S-Expressions](https://en.wikipedia.org/wiki/S-expression) you give it. Check the [tests](https://github.com/IsaacAderogba/atlas-interpreter/tree/main/src/__test__) directory for inspiration.

The following assigns a value of 10 to the variable `x` and then prints it.

```sh
> ./bin/atlas -e '(var x 10) (print x)'

```
