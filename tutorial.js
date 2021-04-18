// Prompts
let lengthPrompt = prompt('Choose a length of at least 8 characters and no more than 128 characters.')
let uppercasePrompt = prompt('Would you like your password to include Uppercase letters?')
let lowercasePrompt = prompt('Would you like your password to include lowercase letters?')
let numberPrompt = prompt('Would you like your password to include numbers?')
let symbolPrompt = prompt('Would you like your password to include symbols?')

uppercasePrompt = uppercasePrompt === 'yes' ? true : false;
lowercasePrompt = lowercasePrompt === 'yes' ? true : false;
numberPrompt = numberPrompt === 'yes' ? true : false;
symbolPrompt = symbolPrompt === 'yes' ? true : false;

if (isNaN(lengthPrompt)) {
    alert("Invalid lengthPrompt.");
  } else {
        let inputNumber = parseInt(lengthPrompt)
         if (inputNumber <= 128 && inputNumber >= 8) {
        lengthPrompt = inputNumber;
        } else {
            alert('Number has to between 8 and 128!')
        }
  } 

// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

resultEl.innerText = generatePassword(
    lowercasePrompt,
    uppercasePrompt,
    numberPrompt,
    symbolPrompt,
    lengthPrompt
)

//Generate event listen
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () =>{
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard');
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    
    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;
    // console.log('typesCount: ', typesCount);

    const typesArr = [{ lower }, { upper }, { number  }, { symbol }].filter
    (
        item => Object.values(item)[0]
    );
    // console.log('typesArr: ', typesArr);

    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }
 const finalPassword = generatedPassword.slice(0, length);

 return finalPassword;
}

// Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}



