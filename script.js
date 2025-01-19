let firstNumber = 0;
let secondNumber = 0;
let buffer = "0";
let operator = "";

const screen = document.querySelector(".screen");
const buttons = document.querySelectorAll(".row div");

function operate(first, second) {
    switch (operator) {
        case "÷":
            if(second === 0) {
                return "Error";
            }
            else {
                return Math.round(first / second);
            }
        case "x":
            return first * second;
        case "-":
            return first - second;
        case "+":
            return first + second;
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        switch (button.className) {
            case "clear": 
                firstNumber = 0;
                secondNumber = 0;
                buffer = "0";
                screen.textContent = buffer;
                operator = "";
                break;
            case "delete": 
                if(parseInt(buffer) !== 0) {
                    buffer = buffer.substring(0, buffer.length - 1);
                    screen.textContent = buffer;
                }
                if(buffer === "") {
                    buffer = "0";
                    screen.textContent = buffer;
                }
                break;
            case "operator":
                if(operator === "" && buffer !== "Error") {
                    operator = button.textContent;
                    firstNumber = parseInt(buffer);
                    buffer = operator;
                    screen.textContent = buffer;
                }
                break;
            case "equal":
                secondNumber = parseInt(buffer);
                buffer = operate(firstNumber, secondNumber).toString();
                if(buffer.length >= 10) {
                    buffer = "Error";
                    firstNumber = 0;
                }
                else {
                    firstNumber = parseInt(buffer);
                }
                screen.textContent = buffer;
                secondNumber = 0;
                operator = "";
                break;
            default:
                if(buffer.length <= 10 ) {
                    if(["Error", "0", "+", "-", "x", "÷"].some(element => buffer.includes(element))) {
                        buffer = button.textContent;
                    }
                    else {
                        buffer += button.textContent;
                    }
                    screen.textContent = buffer;
                }
                break;
        }
    });
});