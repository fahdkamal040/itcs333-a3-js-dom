// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const errorMsg = document.getElementById('error-msg');
    const todoList = document.getElementById('todo-list');
    const counter = document.getElementById('counter');
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterDone = document.getElementById('filter-done');

    let currentFilter = 'all';

    // Update items left counter
    function updateCounter() {
        const items = todoList.querySelectorAll('li');
        let activeCount = 0;
        items.forEach(item => {
            if (!item.classList.contains('completed')) {
                activeCount++;
            }
        });
        counter.textContent = `${activeCount} item(s) left`;
    }

    // Apply current filter visibility
    function applyFilter() {
        const items = todoList.querySelectorAll('li');
        items.forEach(item => {
            const isCompleted = item.classList.contains('completed');
            if (currentFilter === 'all') {
                item.style.display = '';
            } else if (currentFilter === 'active') {
                item.style.display = isCompleted ? 'none' : '';
            } else if (currentFilter === 'done') {
                item.style.display = isCompleted ? '' : 'none';
            }
        });
    }

    // Handle form submission (Add item)
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();

        if (text === '') {
            errorMsg.classList.remove('hidden');
            return;
        }

        errorMsg.classList.add('hidden');

        // Create new list item structure
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = text;
        span.className = 'todo-text';
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';

        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);

        input.value = '';
        updateCounter();
        applyFilter();
    });

    // Event delegation on #todo-list for toggle and delete
    todoList.addEventListener('click', (e) => {
        const target = e.target;
        const li = target.closest('li');
        if (!li) return;

        if (target.classList.contains('delete-btn')) {
            li.remove();
        } else {
            // Toggle complete on text or list item click
            li.classList.toggle('completed');
        }

        updateCounter();
        applyFilter();
    });

    // Filter buttons event listeners
    filterAll.addEventListener('click', () => {
        currentFilter = 'all';
        applyFilter();
    });

    filterActive.addEventListener('click', () => {
        currentFilter = 'active';
        applyFilter();
    });

    filterDone.addEventListener('click', () => {
        currentFilter = 'done';
        applyFilter();
    });
});