

const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const inputArea = document.querySelector('.input-area');


/**
 * @param {string} text
 * @returns {HTMLLIElement}
 */
function createTaskElement(text) {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
    <span class="task-text"></span>
    <div class="task-actions">
        <button class="btn small complete-btn" aria-label="Tandai selesai">Complete</button>
        <button class="btn small delete-btn" aria-label="Hapus tugas">Delete</button>
    </div>
    `;

    li.querySelector('.task-text').textContent = text;
    return li;
}


function addTask() {
    const text = taskInput.value.trim();
    if (!text) {
    
    taskInput.classList.add('shake');
    setTimeout(() => taskInput.classList.remove('shake'), 320);
    taskInput.focus();
    return;
    }

    const taskEl = createTaskElement(text);
    taskList.appendChild(taskEl);

    taskInput.value = '';
    taskInput.focus();
}

inputArea.addEventListener('submit', function(e) {
    e.preventDefault();
    addTask();
});

addBtn.addEventListener('click', addTask);

taskInput.removeEventListener('keydown', function (e) {
    if (e.key === 'Enter') addTask();
});

taskList.addEventListener('click', function (e) {
    const completeBtn = e.target.closest('.complete-btn');
    const deleteBtn = e.target.closest('.delete-btn');

    if (completeBtn) {
    const li = completeBtn.closest('.task-item');
    li.classList.toggle('completed');
    completeBtn.textContent = li.classList.contains('completed') ? 'Undo' : 'Complete';
    return;
    }

    if (deleteBtn) {
        const li = deleteBtn.closest('.task-item');
        li.classList.add('removing');
        setTimeout(() => li.remove(), 280);
        return;
    }
});