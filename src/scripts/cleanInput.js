export function cleanInput() {
  const inputFields = document.querySelectorAll('input');
  inputFields.forEach((input) => {
    input.value = '';
  });


  const firstInput = inputFields[0];
  if (firstInput) {
    firstInput.focus();
  }
}


const isUserLoggedIn = localStorage.getItem('userLoggedIn');


const shouldClearFields = localStorage.getItem('clearFields');

if (!isUserLoggedIn && shouldClearFields) {
  localStorage.removeItem('clearFields');
  cleanInput();
}


window.addEventListener('beforeunload', () => {
  localStorage.setItem('clearFields', 'true');
});
