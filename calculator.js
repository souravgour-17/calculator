document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = null;
    let previousInput = '';
    let isCalculated = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.dataset.value;
            handleInput(value);
        });
    });

    function handleInput(value) {
        if (value === 'C') {
            currentInput = '';
            operator = null;
            previousInput = '';
            display.value = '';
            isCalculated = false;
            return;
        }

        if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput === '' && previousInput === '') {
                return; // Prevent starting with an operator
            }
            if (isCalculated) {
                previousInput = currentInput;
                currentInput = '';
                isCalculated = false;
            } else if (currentInput !== '') {
                previousInput = currentInput;
                currentInput = '';
            }
            operator = value;
            display.value = previousInput + ' ' + operator;
            return;
        }

        if (value === '=') {
            if (previousInput !== '' && operator !== '' && currentInput !== '') {
                try {
                    const result = eval(previousInput + operator + currentInput);
                    display.value = result;
                    currentInput = result.toString();
                    previousInput = '';
                    operator = null;
                    isCalculated = true;
                } catch (e) {
                    display.value = 'Error';
                }
            }
            return;
        }

        if (value === '.') {
            if (isCalculated) {
                currentInput = '0.';
                isCalculated = false;
            } else if (!currentInput.includes('.')) {
                currentInput += value;
            }
        } else {
            if (isCalculated) {
                currentInput = value;
                isCalculated = false;
            } else {
                currentInput += value;
            }
        }
        
        display.value = currentInput;
    }
});