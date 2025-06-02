const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strengthbar');
const feedback = document.getElementById('feedback');
const suggestionsList = document.getElementById('suggestions');
const toggleIcon = document.getElementById('toggleicon');

const weakPasswords = ['123456', 'password', 'qwerty', '111111', 'letmein'];

toggleIcon.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  toggleIcon.classList.toggle('fa-eye');
  toggleIcon.classList.toggle('fa-eye-slash');
});

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;
  let strength = 0;
  let suggestions = [];

  if (weakPasswords.includes(password.toLowerCase())) {
    strengthBar.style.backgroundColor = 'red';
    strengthBar.style.width = '40%';
    feedback.textContent = 'Very Weak (Common Password)';
    feedback.style.color = 'red';
    suggestionsList.innerHTML = '<li>Do not use common passwords</li>';
    return;
  }

  if (password.length >= 8) strength++;
  else suggestions.push('Use at least 8 characters');

  if (/[A-Z]/.test(password)) strength++;
  else suggestions.push('Add uppercase letters');

  if (/[a-z]/.test(password)) strength++;

  if (/[0-9]/.test(password)) strength++;
  else suggestions.push('Include numbers');

  if (/[^A-Za-z0-9]/.test(password)) strength++;
  else suggestions.push('Add special characters');

  if (strength <= 2) {
    strengthBar.style.backgroundColor = 'red';
    strengthBar.style.width = '40%';
    feedback.textContent = 'Weak Password';
    feedback.style.color = 'red';
  } else if (strength === 3 || strength === 4) {
    strengthBar.style.backgroundColor = 'orange';
    strengthBar.style.width = '70%';
    feedback.textContent = 'Moderate Password';
    feedback.style.color = 'orange';
  } else if (strength === 5) {
    strengthBar.style.backgroundColor = 'green';
    strengthBar.style.width = '100%';
    feedback.textContent = 'Strong Password';
    feedback.style.color = 'green';
  }

  suggestionsList.innerHTML = '';
  suggestions.forEach(suggestion => {
    const li = document.createElement('li');
    li.textContent = suggestion;
    suggestionsList.appendChild(li);
  });
});
