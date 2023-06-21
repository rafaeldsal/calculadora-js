const previousOperationText = document.querySelector(".previous-operation");
const currentOperationText = document.querySelector(".current-operation");
const buttons = document.querySelectorAll(".keyboard input");
const iconEqual = document.querySelector(".values-img");

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    this.currentOperation = "";
  }

  // add digit to calculator screen
  addDigit(digit) {
    //check if current operation already has a dot
    if (digit === "," && this.currentOperationText.innerText.includes(",")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  //Process all calculator operations
  processOperation(operation) {
    //check if current is empty
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Change operation
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // get current and previous values
    let operationValue;
    const previous = +this.previousOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "x":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "CE":
        this.processDelOperator();
        break;
      case "C":
        this.processClearAllOperation();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // change values of the calculator screen
  updateScreen(
    operationValue = null,
    operation = null,
    currentValue = null,
    previousValue = null
  ) {
    console.log(operationValue, operation, currentValue, previousValue);

    if (operationValue === null) {
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // check if value is zero, if it is just add current value
      if (previousValue === 0) {
        operationValue = currentValue;
      }

      // Add current value to previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Change math operation
  changeOperation(operation) {
    const mathOperations = ["+", "-", "x", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }
    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Delete the last digit
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);

    if (this.currentOperationText.innerText === "") {
      iconEqual.classList.add("hide");
    }
  }

  // Delete all operations
  processClearAllOperation() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
    iconEqual.classList.add("hide");
  }

  // Process an operation
  processEqualOperator() {
    const operation = previousOperationText.innerText.split(" ")[1];
    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    iconEqual.classList.remove("hide");
    const value = e.target.value;

    if (+value >= 0 || value === ",") {
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});
