window.addEventListener('DOMContentLoaded', main);

async function main() {
  const container = document.getElementById('content');

  const response = await fetch('http://localhost:3000', {
    mode: 'no-cors',
    headers: { 'Access-Control-Allow-Origin': '*' },
  });
  const result = await response.text();

  console.log(result);
}
