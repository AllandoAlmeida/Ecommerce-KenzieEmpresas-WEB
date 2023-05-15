export function SignUp() {
    const button1 = document.getElementById('register1');
    const button2 = document.getElementById('register2');
  
    button2.addEventListener('click', function(event) {
      event.preventDefault(); // Impede o envio do formulário
      location.replace('./register.html');
    
    });
  
    button1.addEventListener('click', function(event) {
      location.replace('./register.html');
  
    });
  }