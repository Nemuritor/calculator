function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let firstNumber = 0;
let secondNumber = 0;
let currentOperator = null;

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            if (b === 0) {
                return 'Cannot divide by zero'; // Handle division by zero
            }
            return divide(a, b);
        default:
            return null;
    }
}

let displayValue = '0';
const display = document.getElementById('display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const clearButton = document.getElementById('clear');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (displayValue === '0') {
            displayValue = button.value;
        } else {
            displayValue += button.value;
        }
        updateDisplay();
    });
});

function updateDisplay() {
    display.textContent = displayValue;
}

let pendingOperation = false;

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!pendingOperation) {
            firstNumber = parseFloat(displayValue);
            currentOperator = button.value;
            pendingOperation = true;
            displayValue = '0'; // Reset display value for second number
            
        }
    });
});

equalsButton.addEventListener('click', () => {
    if (pendingOperation) {
        secondNumber = parseFloat(displayValue);
        console.log(firstNumber+" "+currentOperator+" "+secondNumber);
        displayValue = operate(currentOperator, firstNumber, secondNumber).toString();
        updateDisplay();
        pendingOperation = false;
    }
});

clearButton.addEventListener('click', () => {
    displayValue = '0';
    firstNumber = 0;
    secondNumber = 0;
    currentOperator = null;
    pendingOperation = false;
    updateDisplay();
});