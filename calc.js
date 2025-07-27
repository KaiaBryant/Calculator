document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector('.inputDisplay');
    const numberBtns = document.querySelectorAll('[data-input]');
    const operatorBtns = document.querySelectorAll('[data-operator]');
    const backSpaceBtn = document.getElementById('backSpace');
    const clearBtn = document.getElementById('clearBtn');
    const equalsBtn = document.getElementById('equalsBtn');
    const percentageBtn = document.getElementById('percentageBtn');

    // append numbers (.data-input/operatorBtns) on to display
    numberBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            display.value += btn.getAttribute('data-input');
        });
    });

    // append operators (.data-operator/operatorBtns) in to display
    operatorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lastChar = display.value.slice(-1);
            const operator = btn.getAttribute('data-operator');

            // prevents operators to be used next to each other 
            if (display.value !== '' && !['+', '-', '*', '/', '%', '.', '^'].includes(lastChar)) {
                display.value += operator;
            }
        });
    });

    // parse float function for percentage button
    percentageBtn.addEventListener('click', () => {

        const percentValue = parseFloat(display.value);

        display.value = isNaN(percentValue) ? 'Error' : percentValue / 100;
    });


    // backspcae button, when clicked slice of last input value 
    backSpaceBtn.addEventListener('click', () => {
        display.value = display.value.slice(0, -1);
    });

    // clear button removes all inputs from display
    clearBtn.addEventListener('click', () => {
        display.value = '';
    });

    // equals button, when triggered 
    equalsBtn.addEventListener('click', () => {
        try {
            // for exponent 
            const express = display.value.replace(/\^/g, '**');
            // eval to calculate and return expressions/math
            const result = eval(express);
            display.value = result;
            // error handling 
        } catch (errors) {
            display.value = 'Error';
        }
    });

});