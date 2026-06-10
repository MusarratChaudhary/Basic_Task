let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;

const currentDisplay = document.getElementById('current');
const previousDisplay = document.getElementById('previous');
const colorToggle = document.getElementById('color-toggle'); 

// Color Palette Cycle
const colors = [
    "",                // Default (White/Light)
    "light-pink",
    "light-blue",
    "light-purple",
    "dark-purple",
    "dark-blue",
    "dark-cyan",
    "black"
];
let currentColorIndex = 0;

function updateDisplay() {
    currentDisplay.textContent = currentInput;
    previousDisplay.textContent = previousInput ? `${previousInput} ${operator || ''}` : '';
}

function appendNumber(num) {
    if (shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    } else {
        currentInput = currentInput === '0' && num !== '.' ? num : currentInput + num;
    }
    updateDisplay();
}

function handleOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;
    updateDisplay();
}

function calculate() {
    if (!operator || shouldResetScreen) return;
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch(operator) {
        case '+': result = prev + curr; break;
        case '−': result = prev - curr; break;
        case '×': result = prev * curr; break;
        case '÷':
            if (curr === 0) {
                currentDisplay.style.fontSize = "1.4rem";
                currentDisplay.textContent = "Cannot divide by zero";
                setTimeout(() => {
                    clearAll();
                    currentDisplay.style.fontSize = "";
                }, 1800);
                return;
            }
            result = prev / curr;
            break;
    }

    currentInput = parseFloat(result.toFixed(8)).toString();
    operator = null;
    previousInput = '';
    shouldResetScreen = true;
    updateDisplay();
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetScreen = false;
    currentDisplay.style.fontSize = "";
    updateDisplay();
}

function deleteLast() {
    if (shouldResetScreen) return;
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

function handlePercent() {
    if (currentInput === '0') return;
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Color Toggle Function
function cycleColor() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    document.documentElement.setAttribute('data-color', colors[currentColorIndex]);
    
    try {
        localStorage.setItem('calculator-color', colors[currentColorIndex]);
    } catch(e) {}
}

// Button Events
document.querySelectorAll('.number, .decimal').forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.dataset.value));
});

document.getElementById('add').addEventListener('click', () => handleOperator('+'));
document.getElementById('subtract').addEventListener('click', () => handleOperator('−'));
document.getElementById('multiply').addEventListener('click', () => handleOperator('×'));
document.getElementById('divide').addEventListener('click', () => handleOperator('÷'));
document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('delete').addEventListener('click', deleteLast);
document.getElementById('percent').addEventListener('click', handlePercent);

// Keyboard Support
document.addEventListener('keydown', e => {
    if ('0123456789.'.includes(e.key)) appendNumber(e.key);
    if (e.key === '+') handleOperator('+');
    if (e.key === '-') handleOperator('−');
    if (e.key === '*') handleOperator('×');
    if (e.key === '/') handleOperator('÷');
    if (e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearAll();
});

// Initialize
function init() {
    // Load saved color
    try {
        const savedColor = localStorage.getItem('calculator-color');
        if (savedColor) {
            currentColorIndex = colors.indexOf(savedColor);
            if (currentColorIndex === -1) currentColorIndex = 0;
            document.documentElement.setAttribute('data-color', savedColor);
        }
    } catch(e) {}

    // Color Toggle Button
    if (colorToggle) {
        colorToggle.addEventListener('click', cycleColor);
    }

    updateDisplay();
}

window.onload = init;