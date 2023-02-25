// grab elements from html
const keypadElem = document.querySelector(".keypad");
const screenElem = document.querySelector(".screen");

// initialise some utility variables
let stored = [];
let firstSet = 0;
let operator = "";
let divideByZero = false;

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    return "No can do!";
  }

  return x / y;
}

function operate(operator, x, y) {
  if (isNaN(x) || isNaN(y)) {
    return "No can do!";
  }

  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "*":
      return multiply(x, y);
    case "/":
      return divide(x, y);

    default:
      break;
  }
}

function updateScreen(value) {
  screenElem.textContent = value;
}

function calculate(operator, firstSet, currentSet) {
  return operate(operator, firstSet, currentSet);
}

function clear() {
  stored = [];
  updateScreen(0);
  firstSet = 0;
  operator = "";
  console.log("cleared!");
  return;
}

// when btn is clicked inside keypad, get the textContent

keypadElem.addEventListener("click", (e) => {
  if (e.target.classList.contains("keypad")) {
    return;
  }

  // clear the stored values
  if (e.target.textContent === "c") {
    clear();
    return;
  }

  if (e.target.textContent === "del") {
    if (stored.length > 1) {
      stored.pop();
      updateScreen(stored.join(""));
    } else {
      stored = [];
      updateScreen(0);
    }

    console.log(stored);

    return;
  }

  // if "=" is clicked
  if (e.target.textContent === "=") {
    if (!firstSet) {
      return;
    }

    let result = calculate(operator, firstSet, +stored.join(""));

    firstSet = result;
    updateScreen(result);

    stored = [];

    return;
  }

  //
  if (e.target.classList.contains("operator")) {
    if (firstSet == 0) {
      operator = e.target.textContent;
      firstSet = +stored.join("");
      stored = [];
    } else {
      let result = operate(operator, firstSet, +stored.join(""));

      operator = e.target.textContent;

      updateScreen(result);

      firstSet = result;

      stored = [];
    }
  } else {
    stored.push(e.target.textContent);
    updateScreen(stored.join(""));

    console.log(stored);
  }
});
