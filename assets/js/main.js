let buttons = document.querySelectorAll('.button')
let inputContainer = document.querySelector('.input')
let resultContainer = document.querySelector('.result')

inputContainer.innerHTML = ''
resultContainer.innerHTML = '0'

for (const button of buttons) {
  button.addEventListener('click', function (e) {
    buttonTypeValue = this.dataset.buttonType
    buttonValue = this.dataset.buttonValue
    const buttonType = getButtonType(buttonTypeValue)

    if (buttonType == 'solve') {
      calculateInput()
    }
    else if (buttonType == 'special') {
      executeSpecialFunctions(buttonValue)
    } else {
      addNumbersOrOperatorsToInput(buttonValue)
    }
  })
}

function isResultDecimal(result) {
  const result_array = result.toString().split('.')
  return !!(result_array.length > 1);
}

function calculateInput() {
  let expression = inputContainer.value
  try {
    const result = eval(expression).toString();

    if (isResultDecimal(result)) {
      if (result.length > 8) {
        let length;
        let decimal_part;
        let approximated_result;

        let result_decimal_array = result.toString().split('.')
        const integer_part_count = result_decimal_array[0].length
        const integer_part = result_decimal_array[0]

        length = 8 - integer_part_count
        decimal_part = result_decimal_array[1].split('').slice(0, length)
        approximated_result = [integer_part, decimal_part.join('')].join('.')

        if (result.includes('e+')) {
          length = 8 - (integer_part_count + 2)
          decimal_part = result_decimal_array[1].split('').slice(0, length)
          approximated_result= [integer_part, decimal_part.join('')].join('.') + 'e+' + result.toString().split('e+')[1]
        }
        resultContainer.innerText = approximated_result
      } else {
        resultContainer.innerText = result;
      }
    }
    else if (result.length > 8) {
      resultContainer.innerText = result.split('').slice(0, 8).join('')
    }
    else {
      resultContainer.innerText = result;
    }
    previousInput = expression
    previousResult = result
    inputContainer.value = ''
  } catch (error) {
    console.log(error)
    resultContainer.innerText = 'Error';
  }
}

function executeSpecialFunctions(buttonValue) {
  if (buttonValue == 'CE') {
    expressionsArray = inputContainer.value.toString().split('')
    if (expressionsArray.length < 1) {
      resultContainer.innerText = 0
      return
    }
    expressionsArray.pop()
    inputContainer.value = expressionsArray.join('')
  }

  else if (buttonValue == 'C') {
    inputContainer.value = ''
    resultContainer.innerText = 0
  }
}

function addNumbersOrOperatorsToInput(char) {
  expressionsArray = inputContainer.value.toString().split('')
  expressionsArray.push(char)
  inputContainer.value = expressionsArray.join('')
}


function getButtonType(buttonTypeValue) {
  return buttonTypeValue.toString().split('_')[0]
}