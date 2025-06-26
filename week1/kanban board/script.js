// --- Kanban Board Script ---

const columns = ['backlog', 'todo', 'done'];
const avatars = [
  { initials: 'OZ', color: 'cyan' },
  { initials: 'LE', color: 'purple' },
  { initials: 'AM', color: 'pink' },
  { initials: 'ME', color: 'orange' },
];
const dates = [
  { text: 'Today', class: 'today' },
  { text: 'In three days', class: 'soon' },
  { text: 'Two days ago', class: 'late' },
  { text: 'A week ago', class: '' },
  { text: 'Last Tuesday', class: '' },
  { text: 'July 21', class: 'soon' },
];

const demoTasks = {
  backlog: [
    { title: 'Read about React.js', desc: 'Go through the React documentation and understand hooks.', avatar: 0, date: '2025-07-01' },
    { title: 'Plan football practice', desc: 'Coordinate with friends for the weekend football match.', avatar: 2, date: '2025-06-29' }
  ],
  todo: [
    { title: 'Finish Kanban board project', desc: 'Implement drag-and-drop and modal add task features.', avatar: 1, date: '2025-06-27' },
    { title: 'Go to the gym', desc: 'Leg day workout at 6 PM.', avatar: 3, date: '2025-06-26' },
    { title: 'Daily standup meeting', desc: 'Attend the web dev internship team call at 10 AM.', avatar: 0, date: '2025-06-26' }
  ],
  done: [
    { title: 'Submit weekly report', desc: 'Send progress update to internship mentor.', avatar: 1, date: '2025-06-25' },
    { title: 'Push code to GitHub', desc: 'Upload latest project changes to the repository.', avatar: 2, date: '2025-06-25' },
    { title: 'Football match', desc: 'Played a friendly match with friends.', avatar: 3, date: '2025-06-23' }
  ]
};

function createCard(task, idx) {
  const card = document.createElement('div');
  card.className = 'kanban-card';
  card.draggable = true;
  card.innerHTML = `
    <div class="card-title">${task.title}</div>
    <div class="card-desc">${task.desc}</div>
    <div class="card-footer">
      <span class="card-avatar ${avatars[task.avatar].color}">${avatars[task.avatar].initials}</span>
      <span class="card-date">${formatDate(task.date)}</span>
    </div>
  `;
  card.addEventListener('dragstart', handleDragStart);
  card.addEventListener('dragend', handleDragEnd);
  card.dataset.cardIdx = idx;
  return card;
}

function renderColumn(col) {
  const tasksDiv = document.getElementById(`${col}-tasks`);
  tasksDiv.innerHTML = '';
  demoTasks[col].forEach((task, idx) => {
    const card = createCard(task, idx);
    tasksDiv.appendChild(card);
  });
}

function renderBoard() {
  columns.forEach(renderColumn);
}

// --- Drag and Drop ---
let draggedCard = null;
let draggedFromCol = null;

function handleDragStart(e) {
  draggedCard = this;
  draggedFromCol = this.parentElement.id.replace('-tasks', '');
  setTimeout(() => this.classList.add('dragging'), 0);
}
function handleDragEnd(e) {
  this.classList.remove('dragging');
  draggedCard = null;
  draggedFromCol = null;
  document.querySelectorAll('.kanban-column').forEach(col => col.classList.remove('drag-over'));
}

document.querySelectorAll('.kanban-tasks').forEach(tasksDiv => {
  tasksDiv.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.parentElement.classList.add('drag-over');
  });
  tasksDiv.addEventListener('dragleave', function(e) {
    this.parentElement.classList.remove('drag-over');
  });
  tasksDiv.addEventListener('drop', function(e) {
    e.preventDefault();
    this.parentElement.classList.remove('drag-over');
    if (!draggedCard) return;
    const toCol = this.id.replace('-tasks', '');
    if (toCol !== draggedFromCol) {
      // Move card data
      const idx = +draggedCard.dataset.cardIdx;
      const [moved] = demoTasks[draggedFromCol].splice(idx, 1);
      demoTasks[toCol].push(moved);
      renderBoard();
      addDnDListeners();
    }
  });
});

function addDnDListeners() {
  document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
  });
}

// --- Modal Add Task ---
const modal = document.getElementById('addTaskModal');
const openModalBtn = document.querySelector('.central-add-task-btn');
const closeModalBtn = document.querySelector('.modal-cancel-btn');
const modalForm = document.getElementById('modalAddTaskForm');

openModalBtn.addEventListener('click', () => {
  modal.classList.add('active');
});
closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});
modalForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('modalTaskName').value.trim();
  const desc = document.getElementById('modalTaskDesc').value.trim();
  const time = document.getElementById('modalTaskTime').value;
  const by = +document.getElementById('modalTaskBy').value;
  const col = document.getElementById('modalTaskColumn').value;
  if (name && desc && col && time) {
    demoTasks[col].push({
      title: name,
      desc: desc,
      avatar: by,
      date: time
    });
    renderBoard();
    addDnDListeners();
    modal.classList.remove('active');
    modalForm.reset();
  }
});
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') modal.classList.remove('active');
});

// --- Search Functionality ---
const searchInput = document.querySelector('.search-bar');
searchInput.addEventListener('input', function() {
  const query = this.value.toLowerCase();
  columns.forEach(col => {
    const tasksDiv = document.getElementById(`${col}-tasks`);
    Array.from(tasksDiv.children).forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const desc = card.querySelector('.card-desc').textContent.toLowerCase();
      if (title.includes(query) || desc.includes(query)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

// --- Initial Render ---
renderBoard();
addDnDListeners(); 