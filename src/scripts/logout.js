export function logout() {
  const button = document.getElementById('logout');
  button.addEventListener('click', function(event) {
    localStorage.clear();
    location.replace('/');
  
  });
}


