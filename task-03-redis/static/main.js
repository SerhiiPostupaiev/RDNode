const searchForm = document.getElementById('form');
const notification = document.getElementById('notification');
const searchInput = document.getElementById('input-page');
const page = document.getElementById('page');

searchForm.addEventListener('submit', searchPage);

async function searchPage(e) {
  if (e !== null) {
    e.preventDefault();
    const pageName = adaptValue(searchInput.value);

    try {
      const response = await fetch(
        `http://localhost:3000/topics?page=${pageName}`
      );
      const result = await response.json();
      if (result.status !== 'success') {
        showError(result.error);
        return;
      } else if (result.data.error) {
        showError(result.data.error.info);
        return;
      }

      page.innerHTML = '';
      page.insertAdjacentHTML('beforeend', renderPage(result.data.parse));
    } catch (err) {
      console.error(err);
    }
  }
}

function renderPage(data) {
  return `<ul class="page-list">
            <li><h3>Meta-data</h3></li>
            <li>Title: ${data.title}</li>
            <li>Page ID: ${data.pageid}</li>
            <li>RevID: ${data.revid}</li>
          </ul>`;
}

function adaptValue(value) {
  return value.split(' ').join('_');
}

function showError(error) {
  notification.textContent = error;
  notification.classList.remove('notification_hidden');

  setTimeout(() => {
    notification.classList.add('notification_hidden');
  }, 3000);
}
