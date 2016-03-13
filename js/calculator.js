function calculatorModule () {
  var _memory = 0;
  var _total = 0;
  var error = new Error('Needs a number!');

  // Loads total's initial value to value that is passed in
  function load(num){
    if(typeof(num)==='number'){
    _total = num;
    return _total;
    }
    else{
      throw error;
    }
  }

  // Returns the value stored in total
  function getTotal(){
    return _total;
  }

  // Adds the passed in number to the current value in memory
  function add(a, b){
    if(typeof(a)==='number' && typeof(b)==='number'){
    return a+b;
    }
    else{
      throw error;
    }
  }

  // Subtracts passed in number from total
  function subtract(a, b){
    if(typeof(a)==='number' && typeof(b)==='number'){
    return a-b;
    }
    else{
      throw error;
    }
  }

  // Multiplies passed in number by total
  function multiply(a, b){
    if(typeof(a)==='number' && typeof(b)==='number'){
    return a*b;
    }
    else{
      throw error;
    }
  }

  // Divides total by number passed in
  function divides(a, b){
    if(typeof(a)==='number' && typeof(b)==='number'){
    return a/b;
    }
    else{
      throw error;
    }
  }

  // Returns value currently stored in memory
  function recallMemory(){
    return _memory;
  }

  // Saves the value of total  into memory
  function saveMemory(){
    _memory = _total;
    return _memory;
  }

  // Clear memory
  function clearMemory(){
    _memory = 0;
    return _memory;
  }

  return {
    load : load,
    getTotal: getTotal,
    add: add,
    subtract : subtract,
    multiply : multiply,
    divide : divides,
    recallMemory : recallMemory,
    saveMemory : saveMemory,
    clearMemory : clearMemory
  };


};