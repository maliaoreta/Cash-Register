var Calculator = calculatorModule();

var calcDisplay = document.getElementById('calcDisplay');
var clear = document.getElementById('Clear');
var equals = document.getElementById('=');
var getBalance = document.getElementById('Get Balance');
var depositCash = document.getElementById('Deposit Cash');
var withdrawCash = document.getElementById('Withdraw Cash');
var exp = '';
var expArr = [];
var sum = 0;
var difference = 0;
var mathOp = '';
var mathOps = [' + ', ' - ', ' x ', ' / '];
var a = 0;
var b = 0;
var allowEntry = true;
var tempTotal = 0;
var negativeWithdrawal = 'Insufficient Funds!';
var negativeDeposit = 'Can\'t deposit a negative amount!'

// Attach click event listener and displayValue func for all buttons that need their value displayed
var btnsToDisplay = document.getElementsByClassName('buttons');
  btnsToDisplay[0].addEventListener('click', displayValue);


// Updates the display to show clicked values
function displayValue () {

  // Check if user is modifying previously displayed num that was stored in total
  if(calcDisplay.innerHTML === Number(Calculator.getTotal())){
    calcDisplay.innerHTML = null;
  } 

  // Check if there are multiple math operations
  for (var x = 0; x < mathOps.length; x++){
    if (calcDisplay.innerHTML.includes(mathOps[x])){
      if(event.target.id === ' + ' || event.target.id === ' - ' || event.target.id === ' x ' || event.target.id === ' / '){
        return;
      }
    }
  }

  // Check if display is clear (no error strings to user in display) to enter values
  if (calcDisplay.innerHTML === negativeDeposit || calcDisplay.innerHTML === negativeWithdrawal){
    calcDisplay.innerHTML = null;
    return;
  }
    calcDisplay.innerHTML += event.target.id;
    exp = calcDisplay.innerHTML;  

}


// Evaluate the expression in display when user clicks the = button
equals.addEventListener('click', eval);
function eval () {

  expArr = exp.split(' ');

  for (var j = 0; j < mathOps.length; j++){ 
    for (var k = 0; k < expArr.length; k++){
      if (expArr.includes(mathOps[j].trim())){
        (mathOp = mathOps[j].trim());
         a = Number(expArr[expArr.indexOf(mathOp)-1]);
         b = Number(expArr[expArr.indexOf(mathOp)+1]);
      }
    }
  }

  switch (mathOp) {
    case '+': 
      calcDisplay.innerHTML = Calculator.add(a, b);
      sum = calcDisplay.innerHTML;
      break;
    case '-':
      calcDisplay.innerHTML = Calculator.subtract(a, b);
      difference = calcDisplay.innerHTML;
      break;
    case '/':
      if (b === 0){
        return calcDisplay.innerHTML = 'Undefined!';
      }
      calcDisplay.innerHTML = Calculator.divide(a, b);
      quotient = calcDisplay.innerHTML;
      break;
    case 'x':
      calcDisplay.innerHTML = Calculator.multiply(a, b);
      product = calcDisplay.innerHTML;
      break;
  }
}

// Withdraw Cash
withdrawCash.addEventListener('click', withdraw);
function withdraw () {
  tempTotal = Number(calcDisplay.innerHTML);
    if (Calculator.getTotal()) {
      var calcTotal = Calculator.getTotal();
      calcTotal -= tempTotal;
    }

    // Ensures positive funds
    if (calcTotal < 0){
      return calcDisplay.innerHTML = negativeWithdrawal;
    }
    else if (calcTotal === undefined){
      return;
    }
  Calculator.load(calcTotal);
  calcDisplay.innerHTML = null; 
}


// Adds value in display into cash register (memory) when Deposit Cash is clicked, clears display
depositCash.addEventListener('click', deposit);
function deposit () {

  tempTotal = Number(calcDisplay.innerHTML);
    if (Calculator.getTotal()){
      tempTotal += Calculator.getTotal();
    }

    if (tempTotal < 0){
      return calcDisplay.innerHTML = 'Can\'t deposit a negative amount!';
    }
    if (typeof tempTotal === 'number'){
      Calculator.load(tempTotal);
      calcDisplay.innerHTML = null;
    }
    else {
      return calcDisplay.innerHTML = "Please enter a number!";
    }
}  


// Clears ONLY the display if there is a value in display,
// and clears both display and memory when clicked with no value in display
clear.addEventListener('click', clearDisplay);
function clearDisplay () {

  if (calcDisplay.innerHTML){
    calcDisplay.innerHTML = null;
  }
  else{
    
  Calculator.clearMemory();
  clearTotal();
  }
}


// Get balance
getBalance.addEventListener('click', recallMem);
function recallMem () {
  calcDisplay.innerHTML = Calculator.getTotal();
}

// Clear the value stored in calculator total
function clearTotal () {
  Calculator.load(0);
  console.log(Calculator.getTotal());
}

