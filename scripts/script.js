/**
 * Initializes the page by including HTML templates and loading the header.
 * @async
 * @param {boolean} [showRightSection=true] - Indicates whether to show the right section of the header.
 */
async function init(showRightSection) {
  await includeHTML();
  loadHeader(showRightSection);
}

/**
 * Includes HTML templates into the page.
 * @async
 * @returns {Promise<void>}
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      var html = await resp.text();
      element.innerHTML = html;
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Loads the header with user initials.
 * @param {boolean} [showRightSection=true] - Indicates whether to show the right section of the header.
 */
function loadHeader(showRightSection = true) {
  if (isLoggedIn() && showRightSection) {
    let headerUserInitials = document.getElementById("headerUserInitials");
    const currentUser = getLoggedInUser();    
    headerUserInitials.innerHTML = getLoggedUserInitials(currentUser);
    document.getElementById("header-right-section").style.display = "flex";
  }
}

/**
 * Sets the navigation item with the specified ID as active.
 * @param {string} elementId - The ID of the navigation item to set as active.
 */
function setNavActive(elementId) {
  const navItem = document.getElementById(`nav-${elementId}`);
  navItem.classList.add("active");
}

/**
 * Toggles the visibility of the header menu.
 */
function toggleHeaderMenu() {
  const headerMenu = document.getElementById("header-menu");
  headerMenu.classList.toggle("show");

  if (headerMenu.classList.contains("show")) {
    document.addEventListener("click", closeHeaderMenu);
  }
}

/**
 * Closes the header menu if a click occurs outside of it.
 * @param {Event} event - The click event.
 */
function closeHeaderMenu(event) {
  const headerMenu = document.getElementById("header-menu");
  const headerToggler = document.getElementById("headerUserInitials");
  const targetElement = event.target;

  if (!headerToggler.contains(targetElement) && headerMenu.classList.contains("show")) {
    headerMenu.classList.remove("show");
    document.removeEventListener("click", closeHeaderMenu);
  }
}

/**
 * Get the Initials of a name.
 * @param {string} name - The name from which to generate initials.
 * @returns {string} The initials generated from the name.
 */
function getUserInitials(assignedTo) {  
  let initials = "";
  const nameParts = assignedTo.split(" ");
  for (let i = 0; i < nameParts.length; i++) {
    initials += nameParts[i].charAt(0).toUpperCase();
  }
  return initials;
}


function getLoggedUserInitials(name) {
  let initials = ""
  
  if(name.name !== "Guest") {
    const firstName = name.username.charAt(0);
    const lastName = name.last_name.charAt(0);
    initials = firstName + lastName
    return initials
  } else {
    initials = "G"
    return initials
  }   
}

/**
 * Generates a random integer between 1 and the specified maximum value (inclusive).
 * @param {number} max - The maximum value of the random integer to be generated.
 * @returns {number} A random integer between 1 and max.
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

/**
 * Logs out the user and redirects to the home page.
 */
function doLogOut() {
  if (isLoggedIn()) logOut();
  localStorage.removeItem("summary-animation-played");
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

/**
 * Redirects the user to the home page if not logged in.
 */
function authGuard() {
  if (!isLoggedIn()) window.location.href = "index.html";
}

/**
 * Checks the visibility of the password and updates the visibility icon accordingly.
 * @param {HTMLInputElement} element - The password input element.
 */
function checkPasswordVisibility(element) {
  const icon = element.nextElementSibling.children[0];

  if (element.value === "") {
    icon.src = "assets/icons/lock.svg";
  } else if (element.type === "text") {
    icon.src = "assets/icons/visibility.svg";
  } else if (element.type === "password") {
    icon.src = "assets/icons/visibility_off.svg";
  }
}

/**
 * Toggles the visibility of the password field.
 * @param {HTMLElement} element - The visibility icon element.
 */
function togglePasswordVisibility(element) {
  const input = element.parentNode.previousElementSibling;

  if (input.type === "password") {
    input.type = "text";
  } else {
    input.type = "password";
  }

  checkPasswordVisibility(input);
}

/**
 * Shows a toast message with the given message for a specified time.
 * @param {string} message - The message to display in the toast.
 * @param {number} [time=2500] - The duration in milliseconds to display the toast (optional, default is 2500 milliseconds).
 */
function showToast(message, time = 2500) {
  const toastMessage = document.getElementById("toastMessage");
  toastMessage.innerHTML = message;
  document.body.style.overflow = "hidden";
  fadeInToast();
  setTimeout(function () {
    fadeOutToast();
    document.body.style.overflow = "auto";
  }, time - 150);
}

/**
 * Fades in the toast message.
 */
function fadeInToast() {
  const toastContainer = document.getElementById("toastContainer");
  toastContainer.classList.add("show");
  setTimeout(function () {
    toastContainer.classList.add("animate");
  }, 150);
}

/**
 * Fades out the toast message.
 */
function fadeOutToast() {
  const toastContainer = document.getElementById("toastContainer");
  toastContainer.classList.remove("animate");
  setTimeout(function () {
    toastContainer.classList.remove("show");
  }, 150);
}

/**
 * Opens a dialog by showing it on the screen.
 * @param {string} id - The ID of the dialog to be opened.
 */
async function openDialog(id) {
  const backdrop = document.getElementById("backdrop");
  const dialog = document.getElementById(id);

  backdrop.classList.add("show", "fade-in");
  dialog.classList.add("show", "slide-from-right");

  setTimeout(function () {
    backdrop.classList.remove("fade-in");
    dialog.classList.remove("slide-from-right");
  }, 300);

  backdrop.addEventListener("click", closeDialog);

  contactsToAssigned = await getAllContacts();
  createAssignedTo()
}

/**
 * Closes a dialog by hiding it from the screen.
 * @param {Event} [event] - The click event.
 * @param {boolean} [button=false] - Indicates if the close action was triggered by a button click.
 */
function closeDialog(event, button = false) {
  const backdrop = document.getElementById("backdrop");
  const dialogs = backdrop.children;
  const targetElement = event.target;

  if (button === false && backdrop.contains(targetElement) && backdrop !== targetElement) return;

  backdrop.removeEventListener("click", closeDialog);

  for (let dialog of dialogs) {
    dialog.classList.add("slide-to-right");

    setTimeout(function () {
      dialog.classList.remove("slide-to-right");
      dialog.classList.remove("show");
    }, 250);
  }

  backdrop.classList.add("fade-out");
  setTimeout(function () {
    backdrop.classList.remove("fade-out");
    backdrop.classList.remove("show");
  }, 250);
}

function closeDialogForce() {
  const backdrop = document.getElementById("backdrop");
  const dialogs = backdrop.children;

  backdrop.removeEventListener("click", closeDialog);

  for (let dialog of dialogs) {
    dialog.classList.add("slide-to-right");

    setTimeout(function () {
      dialog.classList.remove("slide-to-right");
      dialog.classList.remove("show");
    }, 250);
  }

  backdrop.classList.add("fade-out");
  setTimeout(function () {
    backdrop.classList.remove("fade-out");
    backdrop.classList.remove("show");
  }, 250);
}

/**
 * Defines color codes for each alphabet letter.
 * @type {Object<string, string>}
 */
const colors = {
  a: "#ff7a00",
  b: "#ff5eb3",
  c: "#6e52ff",
  d: "#9327ff",
  e: "#00bee8",
  f: "#1fd7c1",
  g: "#ff745e",
  h: "#ffa35e",
  i: "#fc71ff",
  j: "#ffc701",
  k: "#0038ff",
  l: "#c3ff2b",
  m: "#ffe62b",
  n: "#ff4646",
  o: "#ffbb2b",
  p: "#ff7a00",
  q: "#ff5eb3",
  r: "#6e52ff",
  s: "#9327ff",
  t: "#00bee8",
  u: "#1fd7c1",
  v: "#ff745e",
  w: "#ffa35e",
  x: "#00bee8",
  y: "#1fd7c1",
  z: "#ff745e",
};

/**
 * Assigns a background color based on the name.
 * @param {string} name - The name used to determine the background color.
 * @returns {string} The background color assigned based on the name.
 */
function assignColor(name) {
  const splittedName = String(name).split(" ");
  const letter = splittedName[0].charAt(0).toLowerCase();
  let bgColor = colors[letter];

  if (splittedName[1]) {
    const letter = splittedName[1].charAt(0).toLowerCase();
    bgColor = colors[letter];
  }

  return bgColor;
}
