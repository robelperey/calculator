// grab elements from html
const keypadElem = document.querySelector(".keypad");
const screenElem = document.querySelector(".screen");
const previousOperandElem = document.querySelector(".previous-operand");
const resultElem = document.querySelector(".result");

let currentOperand = "";
let previousOperand = "";
let operator = "";

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
    return "error";
  }

  return x / y;
}

function operate(operator, x, y) {
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

keypadElem.addEventListener("click", (e) => {
  const key = e.target.textContent;

  if (e.target.classList.contains("keypad")) {
    return;
  }

  if (key === "c") {
    currentOperand = "";
    previousOperand = "";
    previousOperandElem.textContent = previousOperand;
    resultElem.textContent = currentOperand;
    return;
  }

  if (key === "del") {
    if (currentOperand) {
      currentOperand = currentOperand.slice(0, currentOperand.length - 1);
      resultElem.textContent = currentOperand;
      return;
    } else {
      currentOperand = previousOperand;
      resultElem.textContent = currentOperand;
      previousOperand = "";
      previousOperandElem.textContent = previousOperand;
      return;
    }
  }

  if (key === "=") {
    let result = 0;

    if (resultElem.textContent === "error") {
      return;
    }

    if (operator && previousOperand && currentOperand) {
      result = operate(operator, +previousOperand, +currentOperand);
    }

    if (result === "error") {
      currentOperand = "";
      previousOperand = "";
      result = 0;
      resultElem.textContent = "error";
      previousOperandElem.textContent = "";
      return;
    }

    currentOperand = result;
    resultElem.textContent = currentOperand;
    previousOperand = "";
    previousOperandElem.textContent = previousOperand;
    operator = "";

    return;
  }

  if (e.target.classList.contains("operator")) {
    if (resultElem.textContent === "error") {
      return;
    }

    if (currentOperand === "") {
      return;
    }

    let result = 0;

    if (previousOperand === "") {
      previousOperand = currentOperand;
      currentOperand = "";
      previousOperandElem.textContent = `${previousOperand} ${key}`;
      resultElem.textContent = currentOperand;
      operator = key;
    } else {
      let result = operate(operator, +previousOperand, +currentOperand);
      operator = key;
      resultElem.textContent = "";
      previousOperandElem.textContent = `${result} ${key}`;
      previousOperand = result;
      currentOperand = "";
    }

    return;
  }

  currentOperand += key;
  resultElem.textContent = currentOperand;

  // console.log(`${previousOperand} ${operator} ${currentOperand}`);

  e.preventDefault();
});
