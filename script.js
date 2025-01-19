let buffer = "0";
let operator = "";
let firstNumber = null;
let secondNumber = null;
let hasOperator = false;
let hasDecimal = false; 
const MAX_LENGTH = 11;

function operate() {
    switch (operator) {
        case "÷": 
            if (secondNumber === 0) {
                return "Error";
            }
            return firstNumber / secondNumber;
        case "x":
            return firstNumber * secondNumber;
        case "-":
            return firstNumber - secondNumber;
        case "+":
            return firstNumber + secondNumber;
        default:
            return buffer;
    }
}

const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".row div");

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("clear")) {
            buffer = "0";
            firstNumber = null;
            secondNumber = null;
            operator = "";
            hasOperator = false;
            hasDecimal = false;
            screen.textContent = buffer;
        } 
        else if (button.classList.contains("delete")) {
            if (buffer[buffer.length - 1] === operator) {
                hasOperator = false;
            } else if (buffer[buffer.length - 1] === ".") {
                hasDecimal = false; 
            }
            buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
            screen.textContent = buffer;
        } 
        else if (button.classList.contains("equal")) {
            if (hasOperator && !buffer.endsWith(operator) && !buffer.endsWith('.')) {
                const parts = buffer.split(operator === "÷" ? "÷" : operator);
                if (parts.length === 2) {
                    firstNumber = parseFloat(parts[0]);
                    secondNumber = parseFloat(parts[1]);
        
                    if (!isNaN(secondNumber)) {
                        let result = operate();
                        if (result === "Error") {
                            buffer = "Error"; 
                        } else {
                            if (Number(result) === result && result % 1 !== 0) {
                                result = result.toFixed(2); 
                            }
                            buffer = result.toString().slice(0, MAX_LENGTH);
                            hasDecimal = buffer.includes(".");
                        }
                        screen.textContent = buffer;
                    }
                }
                firstNumber = null;
                secondNumber = null;
                operator = "";
                if(buffer.includes('.')) {
                    hasOperator = true;
                }
                hasDecimal = false;
            }
        }
        else if (button.classList.contains("operator")) {
            if (!hasOperator) {
                firstNumber = parseFloat(buffer);
                operator = button.textContent;
                if (buffer.length < MAX_LENGTH) {
                    buffer += operator; 
                    screen.textContent = buffer;
                }
                hasOperator = true;
                hasDecimal = false; 
            }
        } 
        else { 
            if (buffer === "0" && button.textContent !== ".") {
                buffer = button.textContent; 
            } 
            else if (buffer.length < MAX_LENGTH && buffer != "Error" && buffer != "NaN") {
                if (button.classList.contains("decimal")) {
                    if (!hasDecimal) {
                        buffer += button.textContent; 
                        hasDecimal = true;
                    }
                } else {
                    buffer += button.textContent;
                }
            }
            screen.textContent = buffer;
        }
    });
});
