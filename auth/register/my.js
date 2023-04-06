document.addEventListener('DOMContentLoaded', function() {
  var password = document.getElementById("inputPassword");
  var confirmPassword = document.getElementById("inputConfirmPassword");

  function validatePassword() {
    if (password.value != confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords do not match.");
    } else {
      confirmPassword.setCustomValidity("");
    }
  }

  password.onchange = validatePassword;
  confirmPassword.onkeyup = validatePassword;

  // Add form validation using Bootstrap's built-in classes and JavaScript
  var form = document.getElementById("my-form");

  form.addEventListener('submit', function(event) {
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }, false);
});

