// Форма
// Список задач
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };

  let lastSelectedTheme = 'default';
  let sortTask = 'all';

  // Elemnts UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group',
  );
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  const themeSelect = document.getElementById('themeSelect');
  const sortTasksSelect = document.querySelector('.sort');

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onButtonLiHandler);
  themeSelect.addEventListener('change', onThemeSelectHandler);
  sortTasksSelect.addEventListener('click', onSortSelectHandler);


  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('Передайте список задач!');
      return;
    }
    else if (Object.values(tasksList).length === 0) { //вывод сообщения, что список задач пуст
      renderEmptyListMessage();
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList)
    .sort( (prevValue, nextValue) => prevValue.completed - nextValue.completed)
    .forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function renderEmptyListMessage(){
    const emptyTaskListMessage = document.createElement('p');
    emptyTaskListMessage.textContent = 'Список задач пуст!';
    emptyTaskListMessage.style.color = 'red';
    form.insertAdjacentElement('afterend', emptyTaskListMessage);
  }

  function listItemTemplate({ _id, title, body, completed } = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
    );
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'col-sm', 'offset-md-3', 'delete-btn');

    const completeBtn = document.createElement('button'); //кнопка выполнения
    completeBtn.classList.add('btn', 'ml-auto', 'col-sm', 'offset-md-3', 'complete-btn');
    changeCompleteTaskHtml(completed, li, span,completeBtn); 

    const div = document.createElement('div');
    div.classList.add('buttons', 'row', 'col-md-8', 'ml-auto');
    div.appendChild(completeBtn);
    div.appendChild(deleteBtn);

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    li.appendChild(span);
    li.appendChild(div);
    li.appendChild(article);
    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста введите title и body');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  function onButtonLiHandler({target}) {
    if(target.tagName = 'BUTTON') {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      if(target.classList.contains('delete-btn')) onDeleteHandler(id, parent);
      else if (target.classList.contains('complete-btn')) onCompleteHandler(id, target);
  
    }
  }

  function onDeleteHandler(id, parent) {
    const confirmed = deleteTask(id);
    deleteTaskFromHtml(confirmed, parent);
    if (Object.values(objOfTasks).length === 0) renderEmptyListMessage(); //вывод сообщения, что список задач пуст
  }

  function onCompleteHandler(id, target) {
    const complited = completeTask(id); //изменяет поле complited 
    const li =  target.closest('li');
    const span = li.firstChild;
    changeCompleteTaskHtml(complited, li, span, target);
    if (sortTask === 'not_completed') setTimeout(deleteTaskFromHtml, 500, true, li);
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function completeTask(id){
    objOfTasks[id].completed = objOfTasks[id].completed ? false : true;
    return objOfTasks[id].completed;
  }

  //изменяет вид и содержимое кнопки в зависимости от статуса задачи
  function changeCompleteTaskHtml(completed, item, title, button){ 
    if (completed) {
      item.classList.add('bg-light');
      title.classList.add('text-success');
      button.classList.add('btn-warning');
      button.classList.remove('btn-success');
      button.textContent = 'Not completed';
    }
    else{
      item.classList.remove('bg-light');
      title.classList.remove('text-success');
      button.classList.add('btn-success');
      button.classList.remove('btn-warning');
      button.textContent = 'Completed';
    }
  }

  //изменяет вид кнопки сортировки
  function changeSortButtonStyle(newChoice, prevChoice) {
    prevChoice.classList.replace('btn-primary', 'btn-secondary');
    newChoice.classList.replace('btn-secondary', 'btn-primary');
  }

  function renderSortTaskList(sortTask, tasksList){
    listContainer.innerHTML = '';
    if (sortTask === 'all') renderAllTasks(tasksList);
    else {
      //объект только с выполненными задачами
      notCompletedTasksList = Object.values(tasksList)
        .reduce ((acc, task) => {
          if ( !task.completed ) acc[task._id] = task; 
          return acc;
        }, {});
      
      renderAllTasks(notCompletedTasksList);
    }
    return;
  }

  function onSortSelectHandler ({target}){
    if (!target.classList.contains('sort-btn') || sortTask === target.value) return;
    changeSortButtonStyle(target, sortTasksSelect.querySelector(`[value="${sortTask}"]`));
    sortTask = target.value;
    renderSortTaskList(sortTask, objOfTasks);
  }

  function onThemeSelectHandler(event) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(`Вы действительно хотите поменять текущую тему на ${selectedTheme}?`);
    if(!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
  }

  function setTheme (name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }


})(tasks);
