window.addEventListener('DOMContentLoaded', init);

const btn = document.getElementById('g-plus');

function init() {
  btn.addEventListener('click', auth);
}

async function auth(e) {
  if (e !== null) {
    try {
      const response = await fetch('http://localhost:5000/api/auth/google');
      const result = await response.json();

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }
}
