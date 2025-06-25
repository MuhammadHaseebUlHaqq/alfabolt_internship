class ScientificCalculator {
    constructor() {
        this.expressionInput = document.getElementById('expression-input');
        this.resultDisplay = document.getElementById('result');
        this.historyList = document.getElementById('history-list');
        this.variablesList = document.getElementById('variables-list');
        
        this.constants = {
            'pi': Math.PI,
            'e': Math.E
        };
        
        this.variables = {};
        this.history = [];
        this.currentExpression = '';
        
        this.initializeEventListeners();
        this.loadFromLocalStorage();
        this.updateDisplay();
    }

    initializeEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn')) {
                this.handleButtonClick(e.target);
            }
        });

        this.expressionInput.addEventListener('input', (e) => {
            this.currentExpression = e.target.value;
            this.updateDisplay();
        });

        document.getElementById('add-variable').addEventListener('click', () => {
            this.addVariable();
        });

        document.getElementById('clear-history').addEventListener('click', () => {
            this.clearHistory();
        });

        this.expressionInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.calculate();
            }
        });
    }

    handleButtonClick(button) {
        const action = button.dataset.action;
        const value = button.dataset.value;

        if (action) {
            this.handleAction(action);
        } else if (value) {
            this.appendToExpression(value);
        }
    }

    handleAction(action) {
        switch (action) {
            case 'calculate':
                this.calculate();
                break;
            case 'clear':
                this.clear();
                break;
            case 'backspace':
                this.backspace();
                break;
            case 'add-to-history':
                this.addToHistory();
                break;
            case 'sin':
                this.appendFunction('sin');
                break;
            case 'cos':
                this.appendFunction('cos');
                break;
            case 'tan':
                this.appendFunction('tan');
                break;
            case 'sqrt':
                this.appendFunction('sqrt');
                break;
            case 'log':
                this.appendFunction('log');
                break;
            case 'ln':
                this.appendFunction('ln');
                break;
            case 'factorial':
                this.appendFunction('factorial');
                break;
            case 'power':
                this.appendToExpression('^');
                break;
        }
    }

    appendToExpression(value) {
        if (value === 'pi' || value === 'e') {
            this.currentExpression += value;
        } else {
            this.currentExpression += value;
        }
        this.updateDisplay();
    }

    appendFunction(funcName) {
        this.currentExpression += `${funcName}(`;
        this.updateDisplay();
    }

    updateDisplay() {
        this.expressionInput.value = this.currentExpression;
    }

    calculate() {
        try {
            if (!this.currentExpression.trim()) {
                this.showResult('0');
                return;
            }

            const processedExpression = this.preprocessExpression(this.currentExpression);
            const result = this.evaluateExpression(processedExpression);
            
            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid calculation result');
            }

            const formattedResult = parseFloat(result.toFixed(4));
            this.showResult(formattedResult.toString());
            
        } catch (error) {
            this.showError(error.message);
        }
    }

    preprocessExpression(expression) {
        let processed = expression;
        processed = processed.replace(/pi/g, this.constants.pi);
        processed = processed.replace(/e/g, this.constants.e);
        
        Object.keys(this.variables).forEach(varName => {
            const regex = new RegExp(`\\b${varName}\\b`, 'g');
            processed = processed.replace(regex, this.variables[varName]);
        });

        processed = processed.replace(/\^/g, '**');
        processed = processed.replace(/sqrt/g, 'Math.sqrt');
        processed = processed.replace(/sin/g, 'Math.sin');
        processed = processed.replace(/cos/g, 'Math.cos');
        processed = processed.replace(/tan/g, 'Math.tan');
        processed = processed.replace(/log/g, 'Math.log10');
        processed = processed.replace(/ln/g, 'Math.log');
        
        return processed;
    }

    evaluateExpression(expression) {
        expression = this.handleFactorial(expression);
        
        if (!this.isValidExpression(expression)) {
            throw new Error('Invalid expression');
        }

        const result = new Function(`return ${expression}`)();
        
        if (!isFinite(result)) {
            throw new Error('Division by zero or invalid operation');
        }

        return result;
    }

    handleFactorial(expression) {
        return expression.replace(/(\d+)!/g, (match, num) => {
            const n = parseInt(num);
            if (n < 0) throw new Error('Factorial not defined for negative numbers');
            if (n > 170) throw new Error('Factorial too large to compute');
            
            let result = 1;
            for (let i = 2; i <= n; i++) {
                result *= i;
            }
            return result;
        });
    }

    isValidExpression(expression) {
        const safePattern = /^[0-9+\-*/().,Math\s]+$/;
        return safePattern.test(expression);
    }

    showResult(result) {
        this.resultDisplay.textContent = result;
        this.resultDisplay.style.color = '#333';
    }

    showError(message) {
        this.resultDisplay.textContent = `Error: ${message}`;
        this.resultDisplay.style.color = '#ff3b30';
    }

    clear() {
        this.currentExpression = '';
        this.updateDisplay();
        this.showResult('0');
    }

    backspace() {
        this.currentExpression = this.currentExpression.slice(0, -1);
        this.updateDisplay();
    }

    addVariable() {
        const nameInput = document.getElementById('var-name');
        const valueInput = document.getElementById('var-value');
        
        const name = nameInput.value.trim();
        const value = valueInput.value.trim();

        if (!name || !value) {
            alert('Please enter both variable name and value');
            return;
        }

        if (this.constants.hasOwnProperty(name)) {
            alert(`Cannot override constant: ${name}`);
            return;
        }

        if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name)) {
            alert('Invalid variable name. Use letters, numbers, and underscores only.');
            return;
        }

        try {
            const numValue = parseFloat(value);
            if (isNaN(numValue)) {
                throw new Error('Invalid number');
            }
            this.variables[name] = numValue;
        } catch (error) {
            alert('Please enter a valid number for the variable value');
            return;
        }

        nameInput.value = '';
        valueInput.value = '';

        this.updateVariablesDisplay();
        this.saveToLocalStorage();
    }

    updateVariablesDisplay() {
        this.variablesList.innerHTML = '';
        
        Object.entries(this.variables).forEach(([name, value]) => {
            const variableItem = document.createElement('div');
            variableItem.className = 'variable-item';
            variableItem.innerHTML = `
                <span>${name} = ${value}</span>
                <button onclick="calculator.deleteVariable('${name}')">Delete</button>
            `;
            this.variablesList.appendChild(variableItem);
        });
    }

    deleteVariable(name) {
        delete this.variables[name];
        this.updateVariablesDisplay();
        this.saveToLocalStorage();
    }

    addToHistory() {
        if (!this.currentExpression.trim()) return;
        
        const result = this.resultDisplay.textContent;
        if (result.startsWith('Error:')) return;

        const historyItem = {
            expression: this.currentExpression,
            result: result,
            timestamp: new Date().toLocaleString()
        };

        this.history.unshift(historyItem);
        this.updateHistoryDisplay();
        this.saveToLocalStorage();
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        
        this.history.forEach((item, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <button class="delete-btn" onclick="calculator.deleteHistoryItem(${index})">×</button>
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
            `;
            
            historyItem.addEventListener('click', (e) => {
                if (!e.target.classList.contains('delete-btn')) {
                    this.loadFromHistory(item);
                }
            });
            
            this.historyList.appendChild(historyItem);
        });
    }

    loadFromHistory(item) {
        this.currentExpression = item.expression;
        this.updateDisplay();
        this.showResult(item.result);
    }

    deleteHistoryItem(index) {
        this.history.splice(index, 1);
        this.updateHistoryDisplay();
        this.saveToLocalStorage();
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        const data = {
            variables: this.variables,
            history: this.history
        };
        localStorage.setItem('calculatorData', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('calculatorData');
            if (data) {
                const parsed = JSON.parse(data);
                this.variables = parsed.variables || {};
                this.history = parsed.history || [];
                this.updateVariablesDisplay();
                this.updateHistoryDisplay();
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.calculator = new ScientificCalculator();
});