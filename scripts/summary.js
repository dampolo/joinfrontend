let tasks = [];

/**
 * Initializes the summary view by performing necessary setup tasks.
 * This includes authentication, data retrieval, setting navigation, greeting, and showing statistics.
 */
async function initSummary() {
  authGuard();
  await init();
  setNavActive("summary");
  tasks = await getAllTasks();  
  greet();
  showStats();

  // Hide greeting on mobile devices if the window width is less than or equal to 1150 pixels
  window.innerWidth <= 1150
    ? hideGreeting()
    : document.getElementById("summary-geeting-container").classList.add("hidden-on-mobile");
}

/**
 * Returns a greeting based on the time of day, optionally appending the username if provided.
 * @param {boolean} user - Indicates whether to append the username to the greeting.
 * @param {string} [username] - The username to append to the greeting.
 * @returns {string} Greeting.
 */
function greet() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const loggedInUser = getLoggedInUser();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  // Append username to greeting if available
  if (loggedInUser.name !== "Guest") {
    greeting += `,<br> <span class="name">${loggedInUser.username}</span>`;
  } else {
    greeting += "!";
  }

  // Display the greeting message in the HTML element with id 'greeting'
  document.getElementById("greeting").innerHTML = greeting;
}

/**
 * Hides the greeting message on mobile devices.
 * The greeting message is hidden after an animation, and the state is persisted using localStorage.
 */
function hideGreeting() {
  const greetingContainer = document.getElementById("summary-geeting-container");

  // Check if the greeting animation has already been played
  if (localStorage.getItem("summary-animation-played")) {
    greetingContainer.classList.add("hidden-on-mobile");
    return;
  }

  // Hide the greeting message after an animation
  setTimeout(() => {
    greetingContainer.classList.add("fade-out");

    setTimeout(() => {
      greetingContainer.classList.add("hidden-on-mobile");
      greetingContainer.classList.remove("fade-out");
    }, 250);
  }, 2500);

  // Persist the state of the animation using localStorage
  localStorage.setItem("summary-animation-played", true);
}

/**
 * Finds the next urgent task based on due dates.
 * @returns {object|null} The next urgent task object or null if no urgent task is found.
 */
function findNextUrgentTask() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let closestUrgentTask = null;
  let closestDueDate = Infinity;

  tasks.forEach((task) => {
    
    if (task.priority === "URGENT") {
      const dueDate = new Date(task.due_date);
      dueDate.setHours(0, 0, 0, 0);

      if (dueDate >= today && dueDate < closestDueDate) {
        closestUrgentTask = task;
        closestDueDate = dueDate;
      }
    }
  });

  return closestUrgentTask;
}

/**
 * Displays statistics related to tasks.
 */
function showStats() {
  const upcomingDeadline = findNextUrgentTask();

  document.getElementById("num-tasks-in-board").innerHTML = tasks.length;

  document.getElementById("num-tasks-todo").innerHTML = tasks.filter(
    (task) => task.board === "TO_DO"
  ).length;

  document.getElementById("num-tasks-done").innerHTML = tasks.filter(
    (task) => task.board === "DONE"
  ).length;

  document.getElementById("num-tasks-in-progress").innerHTML = tasks.filter(
    (task) => task.board === "IN_PROGRESS"
  ).length;

  document.getElementById("num-tasks-awaiting-feedback").innerHTML = tasks.filter(
    (task) => task.board === "AWAIT_FEEDBACK"
  ).length;

  document.getElementById("num-tasks-urgent").innerHTML = tasks.filter(
    (task) => task.priority === "URGENT"
  ).length;

  document.getElementById("tasks-upcoming-deadline").innerHTML = upcomingDeadline
    ? upcomingDeadline.due_date
    : "n/a";
}
