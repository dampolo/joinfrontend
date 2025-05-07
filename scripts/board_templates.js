/**
 * Generates HTML template for displaying a message when there are no tasks.
 * @param {string} message - The message to be displayed.
 * @returns {string} HTML template for no tasks message.
 */
function noTasksTemplate(message) {
  return `<div class="no-tasks">${message}</div>`;
}

/**
 * Generates HTML template for a task card.
 * @param {number} index - Index of the task.
 * @param {object} task - Task object containing title, description, category, subtasks, assignees, and priority.
 * @param {boolean} draggable - Indicates whether the task card is draggable.
 * @returns {string} HTML template for task card.
 */
function taskCardTemplate(index, task, draggable) {
  // console.log(task.id);
  
  return `
    <div id="task-card-${index}" class="task-card draggable" data-draggable draggable="${draggable}" ondragstart="dragStart(event, this)" data-index="${index}" ondragend="dragEnd(this)" onclick="openTaskDialog('task-dialog', ${index}, ${task.id})">
      <div class="card-body">
        <div class="card-category-changer">
          <div class="fw-bold">Move task to:</div>
          ${taskCardChangeCategoryChangerTemplate(index, task.board)}
          <div class="changer close" onclick="closeChangeTaskCategoryOnMobile(event, ${index})">Cancel</div>
        </div>
        <div class ="card-body-header">
          <div class="label ${task.category === "User Story" ? "user-story" : "technical-task"}">
              <span>${task.category === "User Story" ? "User Story" : "Technical Task"}</span>
          </div>
          <div class="category-changer" onclick="openChangeTaskCategoryOnMobile(event, ${index})">
            <img src="assets/icons/board_black.svg" width="24" height="24" />
          </div>
        </div>
        <div class="card-body-content">
          <h3>${task.title}</h3>
          <p>${task.description}</p>
        </div>
        ${taskCardSubtasksTemplate(task.subtasks)}
        <div class="meta">
          ${taskCardAssigneesTemplate(task.assigned_to)}
          <div class="priority">
            <img src="assets/icons/priority=${task.priority}.svg" alt="${task.priority}" />
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Generates HTML template for a drop zone.
 * @param {string} category - Category of the drop zone.
 * @returns {string} HTML template for drop zone.
 */
function dropZoneTemplate(category) {
  return `
    <div class="dropzone"></div>
  `;
}

/**
 * Generates HTML template for subtasks of a task.
 * @param {Array} subTasks - Array of subtasks.
 * @returns {string} HTML template for subtasks.
 */
function taskCardSubtasksTemplate(subTasks) {
  if (subTasks.length === 0) return "";

  let countCompleted;
  countCompleted = subTasks.filter((subTask) => subTask.completed === true).length;

  return `
    <div class="subtasks">
      <div class="progress-bar">
        <div class="progress" style="width: ${(countCompleted / subTasks.length) * 100}%"></div>
      </div>
      <div class="description">${countCompleted}/${subTasks.length} Subtasks</div>
    </div>
  `;
}

/**
 * Generates HTML template for assignees of a task.
 * @param {Array} assignees - Array of assignees.
 * @returns {string} HTML template for assignees.
 */
function taskCardAssigneesTemplate(assignees) {
  if (assignees.length === 0) return "";

  let html = `<div class="assignees">`;

  const loopLimit = Math.min(assignees.length, 4);

  for (let i = 0; i < loopLimit; i++) {
    const assignee = assignees[i].name;    
    const bgColor = assignColor(assignee);
    html += `
      <div class="avatar" style="background-color: ${bgColor}">
       ${getUserInitials(assignee)}
      </div>`;
  }

  if (assignees.length > 4) {
    html += `
      <div class="avatar accent" style="background-color: var(--gray)">
        +${assignees.length - 4}
      </div>`;
  }

  html += `</div>`;
  return html;
}

/**
 * Generates HTML template for changing the category of a task.
 * @param {number} index - Index of the task.
 * @param {string} category - Current category of the task.
 * @returns {string} HTML template for category changers.
 */
function taskCardChangeCategoryChangerTemplate(index, category) {
  let html = "";

  for (let i = 0; i < boardCategories.length; i++) {
    const boardCategory = boardCategories[i];

    if (category !== boardCategory.name) {
      html += `<div class="changer" onclick="changeTaskCategoryOnMobile(event, ${index}, '${boardCategory.name}')">${boardCategory.label}</div>`;
    }
  }

  return html;
}
