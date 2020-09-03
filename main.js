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
    return (b === 0) ? 'Can\'t divide by zero!' : (a / b);
}

function operate(op, a, b) {
    return op(a, b);
}

function clear() {
    op = '';
    a = '';
    b = '';
}

function updateDisplay(display, text) {
    if (text === 'Clear') {
        displayValue = '0';
        clear();
    } else if (a && op && b && (text === '=' || text in operators)){
        displayValue = operate(op, parseFloat(a), parseFloat(b));
        clear();
        a = displayValue;
        if (text in operators) {
            op = operators[text]
        }
    } else if (text === '=' || (text === '.' && displayValue.includes('.'))) {
        // do nothing
    } else if (op && text in operators){
        op = operators[text];
    } else if (op) {
        b = (b) ? b + text : text;
        displayValue = b;
    } else if (text in operators) {
        op = operators[text];
        a = (a) ? a : display.textContent; 
    } else if (display.textContent === '0') {
        displayValue = text;
    } else if (displayValue && a) {
        a = '';
        displayValue = text;
    } else {
        displayValue += text;
    }
    
    console.log('a = ', a);
    console.log('b = ', b);
    console.log('op = ', op);
    display.textContent = displayValue;
}

const display = document.querySelector('#display');
const buttons = Array.from(document.querySelectorAll('button'));
const operators = {'÷': divide, '×': multiply, '−': subtract, '+': add};
let displayValue = '0';
let op = '';
let a = '';
let b = '';
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(display, button.textContent)
    });
})