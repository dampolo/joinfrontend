/**
 * Starts the animation sequence after a delay of 500 milliseconds.
 */
function startAnimation() {
  setTimeout(() => {
    animateLogo();
    animateBackdrop();
  }, 500);
}

/**
 * Animates the logo by adding a CSS class.
 */
function animateLogo() {
  let logo = document.getElementById("logo");
  logo.classList.add("fixed");
}

/**
 * Animates the backdrop by changing its opacity and then hiding it.
 */
function animateBackdrop() {
  let backdrop = document.getElementById("backdrop");
  backdrop.style.opacity = 0;

  setTimeout(() => {
    backdrop.style.display = "none";
  }, 500);
}

/**
 * Attempts to log in with the provided email and password.
 * Disables the login button during the login attempt.
 * Displays a success message and redirects to "summary.html" if login is successful.
 * Adds an error class to the password field if login fails.
 * @async
 * @returns {Promise<void>}
 */
async function doLogIn() {
  const email = document.getElementById("name");
  const password = document.getElementById("password");
  const logInButton = document.getElementById("logInButton");
  const errorMessage = document.querySelector(".error-message")

  logInButton.disabled = true;
  const result = await logIn(email.value, password.value);
  debugger
  if (result.status === "success") {
    password.parentElement.classList.remove("has-error");
    showToast("You have been logged in successfully.");
    setTimeout(() => {
      window.location.href = "summary.html";
    }, 2500);
  } else {
    password.parentElement.classList.add("has-error");
    errorMessage.innerText = result.message
  }

  logInButton.disabled = false;
}

/**
 * Logs in as a guest user.
 * Disables the login button during the login attempt.
 * Displays a success message and redirects to "summary.html" if login is successful.
 * @async
 * @returns {Promise<void>}
 */
async function logInAsGuest() {
  logInButton.disabled = true;
  if (await logIn("Guest", "GastGast2025!")) {
    showToast("You have been logged in successfully.");
    setTimeout(() => {
      window.location.href = "summary.html";
    }, 2500);
  }

  logInButton.disabled = false;
}
