let boardTasks;
let draggable = true;

/**
 * An array of objects representing different categories on the board.
 * @typedef {Object} BoardCategory
 * @property {string} name - The name of the category.
 * @property {string} emptyMessage - The message to display when the category is empty.
 */
let boardCategories = [
  { name: "to-do", label: "To do", emptyMessage: "No tasks to do" },
  { name: "in-progress", label: "In Progress", emptyMessage: "No tasks in progress" },
  { name: "await-feedback", label: "Await feedback", emptyMessage: "No tasks awaiting feedback" },
  { name: "done", label: "Done", emptyMessage: "No tasks are done" },
];

/**
 * Initializes the board by ensuring authentication, initializing tasks, and rendering the board.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initBoard() {
  authGuard();

  await init();
  setNavActive("board");
  boardTasks = await getTasks();
  contactsToAssigned = await getContacts();
  createAssignedTo();

  window.innerWidth <= 1150 ? (draggable = false) : (draggable = true);
  renderBoard();
}

/**
 * Renders the board with the given tasks or the default tasks if none provided.
 * @param {Array} [tasks] - An optional array of tasks to render.
 */
function renderBoard(tasks) {
  if (!tasks) tasks = boardTasks;

  boardCategories.forEach((category) => {
    tasksContainer = document.getElementById(`tasks-${category.name}`);
    tasksContainer.innerHTML = "";

    filteredTasks = tasks.filter((task) => task.boardCategory === category.name);

    if (filteredTasks.length === 0) {
      tasksContainer.innerHTML = noTasksTemplate(category.emptyMessage);
    } else {
      tasksContainer.innerHTML += renderTasks(filteredTasks);
    }

    tasksContainer.innerHTML += dropZoneTemplate(category.name);
  });
}

/**
 * Renders HTML for an array of tasks.
 * @param {Array} tasks - An array of tasks to render.
 * @returns {string} HTML string representing the tasks.
 */
function renderTasks(tasks) {
  let html = "";

  tasks.forEach((task) => {
    let index = boardTasks.findIndex((obj) => obj === task);
    html += taskCardTemplate(index, task, draggable);
  });

  return html;
}

/**
 * Filters tasks based on a search query and renders the updated board.
 * @param {HTMLElement} element - The input element containing the search query.
 */
function searchTasks(element) {
  let searchQuery = element.value.toLowerCase();
  let filteredTasks = boardTasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery) ||
      task.description.toLowerCase().includes(searchQuery)
    );
  });

  filteredTasks.length === 0
    ? element.parentElement.classList.add("has-error")
    : element.parentElement.classList.remove("has-error");

  renderBoard(filteredTasks);
}

/* Draggable */

/**
 * Handles the drag start event by marking the dragged element.
 * @param {DragEvent} event - The drag start event.
 */
function dragStart(event, element) {
  if (!draggable) {
    return event.preventDefault();
  }

  element.classList.add("dragging");
  event.dataTransfer.setData("elementIndex", element.attributes["data-index"].value);
}

/**
 * Handles the drag end event by removing the dragging class from the element.
 * @param {HTMLElement} element - The element that was being dragged.
 */
function dragEnd(element) {
  element.classList.remove("dragging");
}

/**
 * Shows the drop zone when a draggable element is dragged over it.
 * @param {DragEvent} event - The drag over event.
 * @param {HTMLElement} element - The drop zone element.
 */
function showDropZone(event, element) {
  event.preventDefault();
  if (event.currentTarget.contains(event.relatedTarget)) return;
  element.classList.add("dragover");
}

/**
 * Hides the drop zone when a draggable element leaves it.
 * @param {DragEvent} event - The drag leave event.
 * @param {HTMLElement} element - The drop zone element.
 */
function hideDropZone(event, element) {
  if (event.currentTarget.contains(event.relatedTarget)) return;
  element.classList.remove("dragover");
}

/**
 * Changes the category of a task when it is dropped into a new category's drop zone.
 * @param {DragEvent} event - The drop event.
 */
async function changeTaskCategory(event) {
  event.preventDefault();

  let elementIndex = event.dataTransfer.getData("elementIndex");
  let targetElement = event.currentTarget;
  let category = targetElement.attributes["data-category"].value;

  hideDropZone(event, targetElement);
  boardTasks[elementIndex].boardCategory = category;

  await saveTasks(boardTasks);

  renderBoard();
}

/**
 * Changes the category of a task on mobile devices and updates the board.
 * @param {Event} event - The event triggering the category change.
 * @param {number} index - The index of the task to be updated.
 * @param {string} category - The new category for the task.
 */
async function changeTaskCategoryOnMobile(event, index, category) {
  event.stopPropagation();

  boardTasks[index].boardCategory = category;
  await saveTasks(boardTasks);
  renderBoard();
}

/**
 * Opens the interface to change the category of a task on mobile devices.
 * @param {Event} event - The event triggering the opening of the interface.
 * @param {number} index - The index of the task for which the category change interface is opened.
 */
async function openChangeTaskCategoryOnMobile(event, index) {
  event.stopPropagation();

  const taskCardElement = document.getElementById("task-card-" + index);
  taskCardElement.children[0].children[0].style.display = "flex";
}

/**
 * Closes the interface to change the category of a task on mobile devices.
 * @param {Event} event - The event triggering the closing of the interface.
 * @param {number} index - The index of the task for which the category change interface is closed.
 */
async function closeChangeTaskCategoryOnMobile(event, index) {
  event.stopPropagation();

  const taskCardElement = document.getElementById("task-card-" + index);
  taskCardElement.children[0].children[0].style.display = "none";
}

/**
 * Handles the window resize event and updates draggable elements accordingly.
 * @param {Event} event - The resize event.
 */
addEventListener("resize", (event) => {
  const width = event.target.innerWidth;
  const draggableElements = document.querySelectorAll("[data-draggable]");

  if (width <= 1150 && draggable) {
    draggable = false;
  } else if (width > 1150 && !draggable) {
    draggable = true;
  }

  draggableElements.forEach((element) => {
    element.setAttribute("draggable", draggable);
  });
});

function openAddTaskDialog(id, category) {
  globalBoardCategory = category;
  openDialog(id);
}
