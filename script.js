//create class for Calculator to make text display area

class Calculator {
    constructor(previousField, currentField) {
        this.previousField = previousField;
        this.currentField = currentField;
        this.clear(); //reset to all default valves
    }

    //define all the function of the calculator
    //clear All function connects to the AC button = allClearButton, clears input field display or defaults
    clear() {
        this.current = '';
        this.previous = '';
        this.operation = undefined;
    }
    //delete function connects to the DEL button = deleteButton, like a backspace button
    delete() {
        this.current = this.current.toString().slice(0, -1);
    }
    // add number function connect to number buttons = numberButtons, user click number & number appears in display
    addNumber(number) {
        if (number === '.' && this.current.includes('.')) {
            return
        }
        this.current = this.current.toString() + number.toString();
    }
    // choose Operation function connect to operation buttons = operationButtons, user clicks operation & operation symbols appears in display
    chooseOperation(operation) {
        if (this.current === '') {
            return
        };
        if (this.previous !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previous = this.current;
        this.current = '';
    }
    // compute function compute the math of the operation chosen show answer in current field
    compute() {
        let answer;
        const prev = parseFloat(this.previous); //change what shows up in field to an actual number to do the math
        const curr = parseFloat(this.current);

        if (isNaN(prev) || isNaN(curr)) return // check to see if empty field

        //switch statement of all math options
        switch (this.operation) {
            case '+':
                answer = prev + curr;
                break
            case '-':
                answer = prev - curr;
                break
            case '*':
                answer = prev * curr;
                break
            case '÷':
                answer = prev / curr;
                break
            default:
                return
        }
        this.current = answer;
        this.operation = undefined;
        this.previous = '';
    }
    //make helper function to help get the number to display commas for easier reading also decimal numbers will display decimals properly
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }


    // update Display function will show answer in the input fields
    updateDisplay() {
        this.currentField.innerText = this.getDisplayNumber(this.current);
        if (this.operation != null) {
            this.previousField.innerText = `${this.getDisplayNumber(this.previous)} ${this.operation}`;
        } else {
            this.previousField.innerText = '';
        }
    }
}

// grab all button into variables
const numberButtons = document.querySelectorAll('#number');
const operationButtons = document.querySelectorAll('#operation');
const equalButton = document.querySelector('#equals');
const deleteButton = document.querySelector('#delete');
const allClearButton = document.querySelector('#allClear');
const previousField = document.querySelector('#previous');
const currentField = document.querySelector('#current');

//make variables above work with Calculator object

const calculator = new Calculator(previousField, currentField);

//connect number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    })
})

//connect operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

//connect equal button 
equalButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay()
})

//connect allClear button
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay()
})

// connect delete button
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay()
})