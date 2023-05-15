export function signin() {
    const button = document.getElementById('login');
    button.addEventListener('click', function(event) {
      location.replace('./login.html');
    
    });
  }