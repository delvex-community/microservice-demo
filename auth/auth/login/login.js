document.addEventListener('DOMContentLoaded', function() {
  const instanceIP = window.location.hostname;
  const dynamicLinks = document.querySelectorAll('.dynamic-href');
  dynamicLinks.forEach(link => {
    link.href = `http://${instanceIP}${link.getAttribute('data-href')}`;
  });
});


// Login form scrip
document.addEventListener('DOMContentLoaded', function() {
  const instanceIPs = window.location.hostname;
  const loginForm = document.querySelector('#login-form');
  loginForm.action = `INSERT URL`;
});


<div class="container d-flex justify-content-center align-items-center">
  <div class="row">
    <div class="col-12">
      <div class="mx-auto text-center">
              <h1>login sucessfull</h1>
              <h1>  <div id="message"></div>  </h1>
      </div>
    </div>
  </div>
</div>

  
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search); // Get the query parameters from the URL
    const message = urlParams.get('msg'); // Get the value of the 'msg' parameter
    if (message) {
      const messageElement = document.getElementById('message'); // Get the HTML element to display the message
      messageElement.textContent = message; // Set the text content of the element to the message
    }
)};



