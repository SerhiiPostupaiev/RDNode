window.addEventListener('DOMContentLoaded', main);

const taskForm = document.getElementById('form');
const taskList = document.getElementById('list');
const openFormBtn = document.getElementById('enable-btn');
const cancelBtn = document.getElementById('cancel-btn');
const addTaskBtn = document.getElementById('add-task-btn');
const notification = document.getElementById('notification');

openFormBtn.addEventListener('click', toggleForm);
cancelBtn.addEventListener('click', toggleForm);
taskForm.addEventListener('submit', addTaskToDB);

taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', editTask);

async function main() {
  try {
    const response = await fetch('http://localhost:3000/tasks');
    const result = await response.json();
    if (result.status !== 'success') {
      showError(result.error);
      return;
    }

    for (let i = 0; i < result.data.length; i++) {
      taskList.insertAdjacentHTML('beforeend', renderTask(result.data[i]));
    }
  } catch (err) {
    console.error(err);
  }
}

function editTask(e) {
  if (e !== null) {
    if (e.target.getAttribute('data-operation') === 'edit') {
      const task = e.target.closest('li');
      renderEdit(task);
    }
  }
}

function showError(error) {
  notification.textContent = error;
  notification.classList.remove('notification_hidden');

  setTimeout(() => {
    notification.classList.add('notification_hidden');
  }, 3000);
}

function renderEdit(task) {
  const taskTitle = task.querySelector('.task__title');
  const taskDescription = task.querySelector('.task__description');
  const taskButtons = task.querySelector('.task__buttons');

  taskTitle.classList.add('element_hidden');
  taskTitle.insertAdjacentHTML(
    'afterend',
    renderInput(taskTitle.textContent, 'title')
  );

  taskDescription.classList.add('element_hidden');
  taskDescription.insertAdjacentHTML(
    'afterend',
    renderInput(taskDescription.textContent, 'text')
  );

  taskButtons.classList.add('element_hidden');

  task.insertAdjacentHTML('beforeend', renderOkBtn());

  const okBtn = task.querySelector('.button_ok');

  okBtn.addEventListener('click', performEdit);
}

async function performEdit(e) {
  if (e !== null) {
    const task = e.target.closest('li');
    const bodyObj = {
      title: task.querySelector('input[name="title"]').value,
      text: document.querySelector('input[name="text"]').value,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/tasks/${task.getAttribute('id')}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(bodyObj),
        }
      );

      const result = await response.json();

      if (result.status !== 'success') {
        showError(result.error);
        return;
      }
      task.insertAdjacentHTML('afterend', renderTask(result.data));
      task.remove();
    } catch (err) {
      console.error(err);
    }
  }
}

function renderOkBtn() {
  return `<button type="button" class="button_ok">OK</button>`;
}

function renderInput(value, name) {
  return `<input
  type="text"
  name="${name}"
  value="${value}"
/>`;
}

async function deleteTask(e) {
  if (e !== null) {
    if (e.target.getAttribute('data-operation') === 'delete') {
      const task = e.target.closest('li');

      try {
        const response = await fetch(
          `http://localhost:3000/tasks/${task.getAttribute('id')}`,
          {
            method: 'DELETE',
          }
        );
        const result = await response.json();

        if (result.status !== 'success') {
          showError(result.error);
          return;
        }

        task.remove();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

async function addTaskToDB(e) {
  if (e !== null) {
    e.preventDefault();

    const bodyObj = {
      title: document.getElementById('input-title').value,
      text: document.getElementById('input-description').value,
    };

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(bodyObj),
      });
      const result = await response.json();

      if (result.status !== 'success') {
        showError(result.error);
        return;
      }

      taskList.insertAdjacentHTML('afterbegin', renderTask(result.data));

      taskForm.classList.add('element_hidden');
      openFormBtn.classList.remove('element_hidden');
    } catch (err) {
      console.error(err);
    }
  }
}

function toggleForm(e) {
  if (e !== null) {
    if (taskForm.classList.contains('element_hidden')) {
      taskForm.classList.remove('element_hidden');

      openFormBtn.classList.add('element_hidden');

      taskForm
        .querySelectorAll('.form__input')
        .forEach((item) => (item.value = ''));
    } else {
      taskForm.classList.add('element_hidden');

      openFormBtn.classList.remove('element_hidden');
    }
  }
}

function renderTask(params) {
  return `<li class="task-list__item task" id="${params._id}">
  <h3>Name</h3>
  <p class="task__title">${params.title}</p>
  <h3>Description</h3>
  <p class="task__description">${params.text}</p>
  <div class="task__buttons button">
    <button class="button__edit" data-operation="edit">Edit</button>
    <button class="button__delete" data-operation="delete">Delete</button>
  </div>
</li>`;
}
