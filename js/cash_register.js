
var Calculator = calculatorModule();
var cashRegister = function () {

    var  exp = '';
    var  expArr = [];
    var  tempTotal = 0;
    var  negativeDeposit = 'Can\'t deposit a negative amount!';
    var  negativeWithdrawal = 'Insufficient Funds!';
    var  mathOps = [' + ', ' - ', ' x ', ' / '];
    var mathOp = '';

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
  }

  function evaluate () {

    exp = calcDisplay.innerHTML;  
    expArr = exp.split(' ');

    for (var j = 0; j < mathOps.length; j++){ 
      for (var k = 0; k < expArr.length; k++){
        if (expArr.includes(mathOps[j].trim())){
          (mathOp = mathOps[j].trim());
           var a = Number(expArr[expArr.indexOf(mathOp)-1]);
           var b = Number(expArr[expArr.indexOf(mathOp)+1]);
        }
      }
    }

    switch (mathOp) {
      case '+': 
        calcDisplay.innerHTML = Calculator.add(a, b).toFixed(2);
        break;
      case '-':
        calcDisplay.innerHTML = Calculator.subtract(a, b).toFixed(2);
        break;
      case '/':
        if (b === 0){
          return calcDisplay.innerHTML = 'Undefined!';
        }
        calcDisplay.innerHTML = Calculator.divide(a, b).toFixed(2);
        break;
      case 'x':
        calcDisplay.innerHTML = Calculator.multiply(a, b).toFixed(2);
        break;
    }
  }

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

  function deposit () {

      for (var i = 0; i < mathOps.length; i++){
        if (calcDisplay.innerHTML.includes(mathOps[i])){
          return calcDisplay.innerHTML = 'Invalid input!';
        }
      }


      tempTotal = Number(calcDisplay.innerHTML);
      if (Calculator.getTotal()){
        tempTotal += Calculator.getTotal();
      }

      else if (tempTotal < 0){
        return calcDisplay.innerHTML = 'Can\'t deposit a negative amount!';
      }
      else if (typeof tempTotal === 'number'){
        Calculator.load(tempTotal);
        calcDisplay.innerHTML = null;
      }
  }  

  function clearDisplay () {

    if (calcDisplay.innerHTML){
      calcDisplay.innerHTML = null;
    }
    else{
      
    Calculator.clearMemory();
    clearTotal();
    }
  }

  function recallMem () {
    calcDisplay.innerHTML = Calculator.getTotal();
  }

  // Clear the value stored in calculator total
  function clearTotal () {
    Calculator.load(0);
  }

  return {
    displayValue : displayValue,
    evaluate : evaluate, 
    withdraw : withdraw,
    deposit : deposit,
    clearDisplay : clearDisplay,
    recallMem : recallMem,
    clearTotal : clearTotal
  };
}


var calcDisplay = document.getElementById('calcDisplay');
  calcDisplay.style.resize = 'none';

// Attach click event listener and displayValue func for all buttons that need their value displayed
var btnsToDisplay = document.getElementsByClassName('buttons');
  btnsToDisplay[0].addEventListener('click', function () {
  
    cashRegister().displayValue();
  });

// // Clears ONLY the display if there is a value in display,
// // and clears both display and memory when clicked with no value in display
var clear = document.getElementById('Clear');
clear.addEventListener('click', function () {
  
  cashRegister().clearDisplay();
});

// Evaluate the expression in display when user clicks the = button
var equals = document.getElementById('=');
equals.addEventListener('click', function () {

  cashRegister().evaluate();
});

// Get Balance
var getBalance = document.getElementById('Get Balance');
getBalance.addEventListener('click', function () {

  cashRegister().recallMem();
});

// Adds value in display into cash register (memory) when Deposit Cash is clicked, clears display
var depositCash = document.getElementById('Deposit Cash');
depositCash.addEventListener('click', function () {

  cashRegister().deposit();
});

// Withdraw Cash
var withdrawCash = document.getElementById('Withdraw Cash');
withdrawCash.addEventListener('click', function () {

  cashRegister().withdraw();
});
