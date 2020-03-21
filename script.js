const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmedPassword = document.getElementById('confirm-password');

 
// HANDLE ERRORS
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form__control error';

  const small = formControl.querySelector('small');
  small.textContent = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form__control success';
};

// GET EACH INPUT NAME BY ID FOR ERROR MESSAGE
const getFieldName = input => input.id.charAt(0).toUpperCase() + input.id.slice(1);

// CHECK IF EVERY INPUT HAS A VALUE
const checkRequired = (inputArray) => {
  inputArray.forEach( (input) => {
    if(input.value === ''){
      showError(input, `${getFieldName(input)} is required!`);
    } else {
      showSuccess(input);
    }
  });
};

// HANDLE EMAIL INPUT
const checkValidEmail = input => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(re.test(input.value.trim())){
    showSuccess(input);
  } else if(input.value === ''){
    showError(input, `${getFieldName(input)} is required!`);
  } else {
    showError(input, `${getFieldName(input)} is not valid!`);
  }
};

// CHECK INPUT LENGTH
const checkLength = (input, min, max) => {
  if(input.value === ''){
    showError(input, `${getFieldName(input)} is required!`);
  } else if(input.value.length < min || input.value.length > max){
    showError(input, `${getFieldName(input)} must be between ${min} and ${max} characters`);
  }
};

// CHECK IF PASSWORD AND CONFIRMED PASSWORD MATCH
const checkPassword = (input1, input2) => {
  if(input1.value.length !== input2.value.length){
    showError(input1, `${getFieldName(input)} does not match!`);
    showError(input2, `${getFieldName(input)} does not match!`);
  }
};


// handle event listener
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, confirmedPassword]);

  checkValidEmail(email);

  checkLength(username, 3, 10);
  checkLength(password, 6, 15);
  checkLength(confirmedPassword, 6, 15);

  checkPassword(password, confirmedPassword);
});