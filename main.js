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

function updateHistory(op, a, b) {
    let expression = Math.round(+a * 1000) / 1000 + op + +Math.round(+b * 1000) / 1000 + '=' + +displayValue.toFixed(3);
    let child = document.createElement('p');
    child.textContent = expression;
    history.appendChild(child);
    if (history.childElementCount > 10) {
        console.log(history.childNodes)
        history.removeChild(history.childNodes[3]);
    }
}

function updateDisplay(display, text) {
    if (text === 'Clear') {
        displayValue = '0';
        clear();
    } else if (text === '←') {
        displayValue = displayValue.slice(0, -1);
    } else if (a !== '' && op && b !== '' && (text === '=' || text in operators)){
        // console.log('pop!')
        displayValue = operate(operators[op], parseFloat(a), parseFloat(b));
        updateHistory(op, a, b);
        clear();
        a = displayValue;
        if (text in operators) {
            op = text
        }
    } else if (text === '=' || (text === '.' && displayValue.includes('.'))) {
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
    
    // console.log('a = ', a, typeof a);
    // console.log('b = ', b, typeof b);
    // console.log('op = ', op, typeof op);
    display.textContent = (displayValue) ? displayValue : '0';
}

const display = document.querySelector('#display');
const buttons = Array.from(document.querySelectorAll('button'));
const operators = {'÷': divide, '×': multiply, '−': subtract, '+': add};
const history = document.querySelector('#history');
let displayValue = '0';
let op = '';
let a = '';
let b = '';
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        updateDisplay(display, button.textContent)
    });
})