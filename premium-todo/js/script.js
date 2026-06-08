/**
 Core Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let tasks = JSON.parse(localStorage.getItem('taskmaster_tasks')) || [];
    let currentFilter = 'all';

    // --- DOM Elements ---
    const todoForm = document.getElementById('todoForm');
    const todoInput = document.getElementById('todoInput');
    const priorityInput = document.getElementById('priorityInput');
    const todoList = document.getElementById('todoList');
    const emptyState = document.getElementById('emptyState');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterIndicator = document.querySelector('.filter-indicator');
    const clearCompletedBtn = document.getElementById('clearCompleted');
    const dateDisplay = document.getElementById('currentDate');
    const themeToggle = document.getElementById('themeToggle');

    // Stats Elements
    const totalTasksEl = document.getElementById('totalTasks');
    const remainingTasksEl = document.getElementById('remainingTasks');
    const completedTasksEl = document.getElementById('completedTasks');

    // --- Initialization ---
    const init = () => {
        initTheme();
        updateDate();
        renderTasks();
        updateStats();
        setupEventListeners();
    };

    // --- Theme Management ---
    const initTheme = () => {
        const savedTheme = localStorage.getItem('taskmaster_theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
    };

    const toggleTheme = () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('taskmaster_theme', newTheme);
    };

    // --- Utilities ---
    const updateDate = () => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        dateDisplay.textContent = new Date().toLocaleDateString('en-US', options);
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('taskmaster_tasks', JSON.stringify(tasks));
    };

    const updateStats = () => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.completed).length;
        const remaining = total - completed;

        totalTasksEl.textContent = total;
        remainingTasksEl.textContent = remaining;
        completedTasksEl.textContent = completed;

        // Toggle clear button visibility
        clearCompletedBtn.style.visibility = completed > 0 ? 'visible' : 'hidden';
        clearCompletedBtn.style.opacity = completed > 0 ? '1' : '0';
    };

    // --- Task Actions ---
    const addTask = (text, priority) => {
        const newTask = {
            id: Date.now().toString(),
            text: text.trim(),
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        tasks.unshift(newTask);
        saveToLocalStorage();
        renderTasks();
        updateStats();
    };

    const toggleTask = (id) => {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveToLocalStorage();
        renderTasks();
        updateStats();
    };

    const deleteTask = (id) => {
        const taskEl = document.querySelector(`[data-id="${id}"]`);
        taskEl.style.transform = 'translateX(20px)';
        taskEl.style.opacity = '0';
        
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== id);
            saveToLocalStorage();
            renderTasks();
            updateStats();
        }, 300);
    };

    const clearCompleted = () => {
        tasks = tasks.filter(task => !task.completed);
        saveToLocalStorage();
        renderTasks();
        updateStats();
    };

    // --- Rendering ---
    const renderTasks = () => {
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });

        todoList.innerHTML = '';

        if (filteredTasks.length === 0) {
            emptyState.style.display = 'flex';
            todoList.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            todoList.style.display = 'flex';

            filteredTasks.forEach(task => {
                const li = document.createElement('li');
                const priority = task.priority || 'medium';
                li.className = `todo-item ${priority} ${task.completed ? 'completed' : ''}`;
                li.setAttribute('data-id', task.id);
                
                li.innerHTML = `
                    <label class="checkbox-wrapper">
                        <input type="checkbox" ${task.completed ? 'checked' : ''}>
                        <span class="checkmark">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </span>
                    </label>
                    <div class="task-content">
                        <span class="task-text">${escapeHtml(task.text)}</span>
                        <span class="priority-badge ${priority}">${priority}</span>
                    </div>
                    <button class="btn-delete" aria-label="Delete task">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                    </button>
                `;

                // Add event listeners to newly created elements
                const checkbox = li.querySelector('input');
                checkbox.addEventListener('change', () => toggleTask(task.id));

                const deleteBtn = li.querySelector('.btn-delete');
                deleteBtn.addEventListener('click', () => deleteTask(task.id));

                todoList.appendChild(li);
            });
        }
    };

    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };

    // --- Event Listeners ---
    const setupEventListeners = () => {
        // Form Submission
        todoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = todoInput.value.trim();
            const priority = priorityInput.value;
            if (text) {
                addTask(text, priority);
                todoInput.value = '';
                todoInput.focus();
            }
        });

        // Filtering
        filterBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const width = btn.offsetWidth;
                filterIndicator.style.transform = `translateX(${index * 100}%)`;
                
                currentFilter = btn.dataset.filter;
                renderTasks();
            });
        });

        // Clear Completed
        clearCompletedBtn.addEventListener('click', clearCompleted);

        // Theme Toggle
        themeToggle.addEventListener('click', toggleTheme);
    };

    // Start the app
    init();
});
