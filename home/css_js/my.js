document.addEventListener('DOMContentLoaded', function() {
  const instanceIP = window.location.hostname;
  const dynamicLinks = document.querySelectorAll('.dynamic-href');
  dynamicLinks.forEach(link => {
    link.href = `http://${instanceIP}${link.getAttribute('data-href')}`;
  });
});

