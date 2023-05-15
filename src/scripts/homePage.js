export function HomePage() {
    const button = document.getElementById('home');
    button.addEventListener('click', function(event) {
      location.replace('/index.html');
    
    });
  }

