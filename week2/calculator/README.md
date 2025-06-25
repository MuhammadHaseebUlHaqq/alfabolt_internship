# Scientific Calculator

A comprehensive scientific calculator built with HTML, CSS, and JavaScript (ES6/ES7) that supports advanced mathematical operations, variables, and calculation history.

## Features

### Mathematical Operations
- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (×), Division (÷)
- **Advanced Operations**: Exponentiation (^), Square Root (√)
- **Trigonometric Functions**: sin, cos, tan
- **Logarithmic Functions**: log (base 10), ln (natural logarithm)
- **Factorial**: x! (up to 170!)
- **Parentheses**: Full support for complex expressions with parentheses

### Constants
- **π (pi)**: 3.141592653589793
- **e**: 2.718281828459045

### Variables
- **User-defined variables**: Create custom variables with any valid name
- **Variable protection**: Cannot override built-in constants (pi, e)
- **Variable validation**: Names must start with a letter or underscore
- **Persistent storage**: Variables are saved to localStorage

### History
- **Calculation history**: All calculations are automatically saved
- **Click to reuse**: Click any history item to load it back into the calculator
- **Delete individual items**: Remove specific calculations from history
- **Clear all history**: Remove all saved calculations
- **Persistent storage**: History is saved to localStorage

### Input Methods
- **Button clicks**: Click calculator buttons to input expressions
- **Keyboard typing**: Type directly into the input field
- **Enter key**: Press Enter to calculate the current expression

### Error Handling
- **Division by zero**: Proper error messages for invalid operations
- **Invalid expressions**: Clear error messages for syntax errors
- **Factorial limits**: Prevents calculation of factorials for negative numbers or values > 170
- **Expression validation**: Security checks to prevent malicious code execution

### Display Features
- **4 decimal precision**: All results are displayed with exactly 4 decimal places
- **Real-time updates**: Input field updates as you type or click buttons
- **Error highlighting**: Error messages are displayed in red
- **Responsive design**: Works on desktop and mobile devices

## Usage

### Basic Calculations
1. Click number buttons or type numbers
2. Click operator buttons (+, -, ×, ÷, ^)
3. Press Enter or click = to calculate

### Scientific Functions
1. Click function buttons (sin, cos, tan, √, log, ln)
2. Enter the value or expression in parentheses
3. Complete the expression and calculate

### Using Variables
1. Enter a variable name (e.g., "radius")
2. Enter a numeric value (e.g., "5")
3. Click "Add Variable"
4. Use the variable name in expressions (e.g., "radius * 2")

### Using Constants
- Click the π button to insert pi
- Click the e button to insert e
- Or type "pi" or "e" directly

### History Management
- Click "Save" to add the current calculation to history
- Click any history item to load it back
- Click the × button on history items to delete them
- Click "Clear History" to remove all saved calculations

## Technical Details

### Browser Compatibility
- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge

### Local Storage
The calculator uses localStorage to persist:
- User-defined variables
- Calculation history

### Security Features
- Expression validation to prevent code injection
- Safe evaluation using Function constructor
- Input sanitization for variable names

### Code Structure
- **ES6 Class-based architecture**: Main calculator logic in `ScientificCalculator` class
- **Event-driven design**: All interactions handled through event listeners
- **Modular functions**: Each feature implemented as separate methods
- **Error handling**: Comprehensive try-catch blocks throughout

## File Structure
```
├── index.html      # Main HTML structure
├── styles.css      # CSS styling and layout
├── script.js       # JavaScript functionality
└── README.md       # This documentation
```

## Examples

### Basic Arithmetic
```
2 + 3 * 4 = 14
(2 + 3) * 4 = 20
10 / 2 = 5
```

### Scientific Functions
```
sin(pi/2) = 1
sqrt(16) = 4
log(100) = 2
5! = 120
2^3 = 8
```

### Using Variables
```
radius = 5
area = pi * radius^2 = 78.5398
```

### Complex Expressions
```
sin(pi/4) * cos(pi/4) = 0.5
sqrt(pi * e) = 2.9223
log(1000) + ln(e) = 3
```

## Installation

1. Download all files to a directory
2. Open `index.html` in a web browser
3. Start calculating!

No additional dependencies or installation required. 