function editTaskMinimumDate() {
    let today = new Date().toISOString().split("T")[0];
    document.getElementById("date-edit").setAttribute("min", today);
  }


function editTaskRenderAssignedToHtml(i, bgColor, contact, assigned) {
  return /*html*/ `
  <li>
    <label for="person${i}">
      <span class="avatar" style="background-color: ${bgColor};">${getUserInitials(contact)}</span>
      <span>${contact}</span>
    </label>
      <input class="add-task-checkbox-edit" type="checkbox" name="person[${i}]" id="person${i}" value="${contact}" ${ assigned ? "checked" : "" } onclick="editTaskAssignedTo()">
  </li>
  `;
}
  

function renderTaskAssigneeHtml(assignee, bgColor) {
  console.log(bgColor);
  
  return `
    <div class="assignee">
      <div class="avatar" style="background-color: ${bgColor}">
        ${getUserInitials(assignee.name)}
      </div>
      <div class="assignee-name">${assignee.name}</div>
    </div>
  `;
}

function renderTaskSubtaskHtml(index, subtask) {
  return `
    <div class="checkbox-wrapper">
      <label class="checkbox" for="subtask-${index}">
        <input id="subtask-${index}" type="checkbox"
          ${subtask.completed ? "checked" : ""} onclick="toggleSubtaskState(${index})"
        />
        <div class="checkbox-icon"></div>
        <div class="checkbox-label">${subtask.description}</div>
      </label>
    </div>
  `;
}
  

function editRenderTaskSubtasksListHtml(i, subtasksName) {
    return /*html*/ `   
        <li>
          <span class="add-task-subtasks-extra-task" id="add-task-subtasks-extra-task">${subtasksName}</span> 
          <div class="add-task-subtasks-icons">
            <img class="add-task-edit" src="./assets/icons/edit_dark.svg"  onclick="editTaskSubtasksListInBoard(${i}, event)" >
              <div class="add-tasks-border"></div>
            <img  class="add-task-trash" src="./assets/icons/basket.svg" onclick="removeFromEditAddTaskSubtasksList(${i}, event)">
          </div>
        </li>
      `;
    }


function editAddTaskSubtasksListHtml(i, subtasks){
    return /*html*/ `   
      <li>
        <span class="add-task-subtasks-extra-task" id="add-task-subtasks-extra-task">${subtasks}</span> 
        <div class="add-task-subtasks-icons">
          <img class="add-task-edit" src="./assets/icons/edit_dark.svg"  onclick="editTaskSubtasksListInBoard(${i}, event)" >
            <div class="add-tasks-border"></div>
          <img  class="add-task-trash" src="./assets/icons/basket.svg" onclick="removeFromEditAddTaskSubtasksList(${i}, event)">
        </div>
      </li>
  `;
}