document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  
  if(loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        const data = await window.api.login(email, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        
        // Redirect based on role
        if (data.role === 'admin') {
          window.location.href = 'admin/dashboard.html';
        } else {
          window.location.href = 'index.html';
        }
      } catch (error) {
        alert(error.message);
      }
    });
  }
});
