var Calculator = calculatorModule();
var display = document.getElementById('display');
var clear = document.getElementById('Clear');


// Display shows number value being clicked
for (var i = 0; i <= 9; i++){
  var numBtn = document.getElementById(i);
  numBtn.addEventListener('click', numbersClicked);
}

// Updates the display to show clicked numbers, saves those numbers in total
function numbersClicked () {
  display.innerHTML += this.id;
  Calculator.load(Number(display.innerHTML));
}

// Clears the display when clicked
clear.addEventListener('click', clearDisplay);
function clearDisplay () {
  display.innerHTML = null;
}


