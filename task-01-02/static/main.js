window.addEventListener('DOMContentLoaded', main);

const taskForm = document.getElementById('form');
const taskList = document.getElementById('list');
const openFormBtn = document.getElementById('enable-btn');
const cancelBtn = document.getElementById('cancel-btn');
const addTaskBtn = document.getElementById('add-task-btn');

openFormBtn.addEventListener('click', toggleForm);
cancelBtn.addEventListener('click', toggleForm);
taskForm.addEventListener('submit', addTaskToDB);

taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', editTask);

async function main() {
  try {
    const response = await fetch('http://localhost:3000/api/tasks');
    const result = await response.json();

    for (let i = 0; i < result.length; i++) {
      taskList.insertAdjacentHTML('beforeend', renderTask(result[i]));
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

function renderEdit(task) {
  const taskHeader = task.querySelector('.task__header');
  const taskDescription = task.querySelector('.task__description');
  const taskButtons = task.querySelector('.task__buttons');

  taskHeader.classList.add('element_hidden');
  taskHeader.insertAdjacentHTML(
    'afterend',
    renderInput(taskHeader.textContent, 'header')
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
      header: task.querySelector('input[name="header"]').value,
      text: document.querySelector('input[name="text"]').value,
    };

    try {
      const response = await fetch(
        `http://localhost:3000/api/tasks/${task.getAttribute('id')}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(bodyObj),
        }
      );

      const result = await response.json();

      task.insertAdjacentHTML('afterend', renderTask(result));
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
        await fetch(
          `http://localhost:3000/api/tasks/${task.getAttribute('id')}`,
          {
            method: 'DELETE',
          }
        );

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
      header: document.getElementById('input-header').value,
      text: document.getElementById('input-description').value,
    };

    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(bodyObj),
      });
      const result = await response.json();

      taskList.insertAdjacentHTML('afterbegin', renderTask(result));

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
  return `<li class="task-list__item task" id="${params.id}">
  <h3>Name</h3>
  <p class="task__header">${params.header}</p>
  <h3>Description</h3>
  <p class="task__description">${params.text}</p>
  <div class="task__buttons button">
    <button class="button__edit" data-operation="edit">Edit</button>
    <button class="button__delete" data-operation="delete">Delete</button>
  </div>
</li>`;
}
