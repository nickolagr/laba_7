const todoForm = document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItem = document.querySelectorAll('.todo-item');

todoForm.addEventListener('submit', addToDoItem);
main();

function main() {
    todoForm.addEventListener('submit', addToDoItem);
    todoItem.forEach(item => bindEvents(item));
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox');
    const editButton = todoItem.querySelector('button.edit');
    const editDelete = todoItem.querySelector('button.delete');

    checkbox.addEventListener('change', toggleTotoItem);
    editButton.addEventListener('click', editTodoItem);
    editDelete.addEventListener('click', deleteTodoItem);
}

function addToDoItem(event) {
    event.preventDefault();
    if (addInput.value === '') return alert('Enter the task name');
    
    const todoItem = createToDoItem(addInput.value);
    todoList.appendChild(todoItem);
    addInput.value = '';
}

function toggleTotoItem() {
    const listItem = this.parentNode;
    listItem.classList.toggle('completed');
}

function editTodoItem() {
    const listItem = this.parentNode;
    const title = listItem.querySelector('.title');
    const editInput = listItem.querySelector('.textfield');
    const isEditing = listItem.classList.contains('editing');
    if (isEditing) {
        title.innerText = editInput.value;
        this.innerText = 'Изменить';
    } else {
        editInput.value = title.innerText;
        this.innerText = 'Сохранить';
    }

    listItem.classList.toggle('editing');
    console.log(22222);
}

function deleteTodoItem() {
    const listItem = this.parentNode;
    todoList.removeChild(listItem);
    //console.log(listItem);
}

function createToDoItem(title) {
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'checkbox';

    const label = document.createElement('label');
    label.innerText = title;
    label.className = 'title';

    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'textfield';

    const editButton = document.createElement('button');
    editButton.className = 'edit';
    editButton.innerText = 'Изменить';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerText = 'Удалить';

    const listItem = document.createElement('li');
    listItem.className = 'todo-item';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    console.log(listItem);

    bindEvents(listItem);

    return listItem;
}