var length = prompt('password length. must be greater than 8 and less than 128')
var lowercase = prompt('include lowercase? yes or no') 
var uppercase = prompt('include uppercase? yes or no')
var hasNumbers = prompt('include numbers? yes or no')
var specialChar = prompt('include special characters? yes or no')
var generate = document.querySelector('#generate')
var passwordDisplay = document.querySelector('#password')

generate.addEventListener("click", () => {
    generatePassword()
});

function generatePassword() {
    var password = '';
    var uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var lowercaseLetters = 'abcdefghijklmnopqrstuvwxy'
    var numbers = '0123456789'
    var specialCharacters = '*;<>()[]{}#$?!^|'
    var allCharacters = ''

    if (lowercase === 'yes') {
        allCharacters += lowercaseLetters
    }
    
    if (uppercase === 'yes') {
        allCharacters += uppercaseLetters
    }
    
    if (hasNumbers === 'yes') {
        allCharacters += numbers
    }

    if (specialChar === 'yes') {
        allCharacters += specialCharacters
    }

    console.log('all', allCharacters)


    for ( i=1; i<8; i++ ) {
      let randomPasswordLength = Math.floor(Math.random() * length + 1)
      password += allCharacters.charAt(randomPasswordLength)
    }
    passwordDisplay.value = password
}