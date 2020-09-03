// Core operation functions
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
    return (b === 0) ? 'NaN' : (a / b);
}

function operate(op, a, b) {
    return op(a, b);
}

// Helper Functions for updateDisplay()
function clear() {
    op = '';
    a = '';
    b = '';
    displayValue = '0';
}

function updateHistory(op, a, b) {
    let expression = Math.round(+a * 1000) / 1000 + op + +Math.round(+b * 1000) / 1000 + '=' + Math.round(+displayValue * 1000) / 1000;
    let child = document.createElement('p');
    child.textContent = expression;
    history.appendChild(child);
    if (history.childElementCount > 10) {
        // console.log(history.childNodes)
        history.removeChild(history.childNodes[3]);
    }
}

function deleteLast() {
    if (displayValue === 'NaN') { 
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
        if (!b) {
            a = a.slice(0, -1);
        } else {
            b = b.slice(0, -1);
        }
    }
}

function isNumberKey(keyCode) {
    return ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))
}

function isOperatorKey(keyCode) {

}

// Primary logic
function updateDisplay(display, text) {
    if (text === 'Clear') {
        clear();
    } else if (text === '←') {
        deleteLast();
    } else if (a !== '' && op && b !== '' && (text === '=' || text in operators)){
        // console.log('pop!')
        let eval = operate(operators[op], parseFloat(a), parseFloat(b)).toString();
        if (eval === 'NaN') {
            alert('Error');
            clear();
        } else {
            displayValue = eval;
            updateHistory(op, a, b);
            clear();
            a = eval;
            displayValue = a;
        }
        if (text in operators) {
            op = text
        }
    } else if (text === '=') {
        op = '';
    } else if (text === '.' && displayValue.includes('.')) {
        // do nothing
    } else if (op && text in operators){
        op = text;
    } else if (op) {
        b = (b) ? b + text : text;
        displayValue = b;
    } else if (text in operators) {
        op = text;
        a = (a) ? a : display.textContent; 
    } else if (display.textContent === '0') {
        displayValue = text;
    } else if (displayValue && a) {
        a = '';
        displayValue = text;
    } else {
        displayValue += text;
    }
    
    console.log('a = ', a, typeof a);
    console.log('b = ', b, typeof b);
    console.log('op = ', op, typeof op);
    display.textContent = (displayValue) ? displayValue : '0';
}

// Initialization
const display = document.querySelector('#display');
const buttons = Array.from(document.querySelectorAll('button'));
const operators = {'÷': divide, '×': multiply, '−': subtract, '+': add};
const numPadOperators = {'Enter':'=', 'Add':'+', 'Subtract':'−', 'Multiply':'×', 'Divide':'÷', 'Decimal':'.'};
const history = document.querySelector('#history');
let displayValue = '0';
let op = '';
let a = '';
let b = '';

// Event listeners for buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(display, button.textContent)
    });
})

// Event listeners for keypresses
window.addEventListener('keydown', (event) => {
    let key = event.code;
    if (key.includes('Numpad')) {
        key = key.replace('Numpad', '');
        console.log(key);
        updateDisplay(display, (key in numPadOperators) ? numPadOperators[key] : key);
    }
});