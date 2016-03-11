var Calculator = calculatorModule();

var Calc = document.getElementById('main');
var calcButtons = document.createElement('div');
  Calc.appendChild(calcButtons);

// Create separate rows for buttons
var buttonRow = ['rowClear', 'rowBal', 'rowDep', 'rowWith', 'rowEqual'];
buttonRow.forEach(createRow);
function createRow (buttonRow) {
  var row = document.createElement('div');
  row.id = buttonRow;
  Calc.appendChild(row);
}


// Array of all required buttons
var buttonNames = [7, 8, 9, '/', 'Clear', 
                  4, 5, 6, 'x', 'Get Balance', 
                  1, 2, 3, '-', 'Deposit Cash', 
                  0, '00', '.', '+', 'Withdraw Cash', 
                  '='];

// Create all buttons
buttonNames.forEach(createButton);
function createButton (buttonName) {

  var button = document.createElement('button');
  button.id = buttonName;
  button.innerHTML = buttonName;
}

// append buttons to separate rows
var rowOneButtons = buttonNames.slice(0, 5);
for (var i = 0; i < rowOneButtons.length; i++){
  
}

