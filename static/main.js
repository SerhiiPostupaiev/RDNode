window.addEventListener('DOMContentLoaded', main);

async function main() {
  const container = document.getElementById('content');

  try {
    const response = await fetch('http://localhost:3000/test');
    const result = await response.json();

    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
