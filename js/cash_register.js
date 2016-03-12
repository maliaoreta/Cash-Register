var Calculator = calculatorModule();
var calcDisplay = document.getElementById('calcDisplay');
var clear = document.getElementById('Clear');
var equals = document.getElementById('=');
var plus = document.getElementById(' + ');
var subtract = document.getElementById(' - ');
var divide = document.getElementById(' / ');
var multiply = document.getElementById(' x ');
var getBalance = document.getElementById('Get Balance');
var exp = '';
var sum = 0;
var difference = 0;
var mathOp = '';

// Display shows number value being clicked for numbers 0-9
for (var i = 0; i <= 9; i++){
  var numBtn = document.getElementById(i);
  numBtn.addEventListener('click', displayValue);
}
// Display special case 00
var doubleZero = document.getElementById('00');
  doubleZero.addEventListener('click', displayValue);

// // Add math operations to the display
plus.addEventListener('click', displayValue);
divide.addEventListener('click', displayValue);
multiply.addEventListener('click', displayValue);
subtract.addEventListener('click', displayValue);

// Updates the display to show clicked values
function displayValue () {

  // Check if user is adding num to previous sum, if not clear display
  for (var i = 0; i <= 9; i++){
    if(calcDisplay.innerHTML == sum && this.id == i){
      calcDisplay.innerHTML = null;
    }  
  }

  // Check if there is already a math operation in the display
  
  calcDisplay.innerHTML += this.id;
  exp = calcDisplay.innerHTML;
}


// Evaluate the expression when click =
equals.addEventListener('click', eval);

function eval () {
  exp = exp.split(' ');

  var mathOps = ['+', '-', 'x', '/'];
  var a = 0;
  var b = 0;

  for (var i = 0; i < mathOps.length; i++){
    for (var k = 0; k < exp.length; k++){
      if (exp.includes(mathOps[i])){
        mathOp = mathOps[i];
         a = Number(exp[exp.indexOf(mathOp)-1]);
         b = Number(exp[exp.indexOf(mathOp)+1]); 
      }
    }
  }

  switch (mathOp) {
    case '+': 
      sum = calcDisplay.innerHTML = Calculator.add(a, b);
      saveMem(sum);
      break;
    case '-':
      difference = calcDisplay.innerHTML = Calculator.subtract(a, b);
      saveMem(difference);
      break;
    case '/':
      quotient = calcDisplay.innerHTML = Calculator.divide(a, b);
      saveMem(quotient);
      break;
    case 'x':
      product = calcDisplay.innerHTML = Calculator.multiply(a, b);
      saveMem(product);
      break;
  }
}


// Clears the display when clicked
clear.addEventListener('click', clearDisplay);

function clearDisplay () {
  calcDisplay.innerHTML = null;
  Calculator.clearMemory();
}

function saveMem (num) {
  Calculator.saveMemory();
}