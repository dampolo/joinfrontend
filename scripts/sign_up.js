/**
 * Performs the sign-up process.
 * @returns {Promise<void>} A promise that resolves once the sign-up process is complete.
 */
async function signUp() {
  const userName = document.getElementById("username").value;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const telephone = document.getElementById("telephone").value
  const password = document.getElementById("password").value;

  const userData = {
    username: userName,
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: telephone,
    password: password,
    repeated_password: password
  };

    const result = await saveUsers(userData)
  if (result.status !== "error") {
    showToast("You signed up successfully.");
    setTimeout(() => {
      window.location.href = "index.html?registered=true";
    }, 2500);
  } else {
    showError(result)
  }
}

function showError(result) {
  document.querySelector(".username-error").innerText = "";
  document.querySelector(".first-name-error").innerText = "";
  document.querySelector(".last-name-error").innerText = "";
  document.querySelector(".telephone-error").innerText = "";
  document.querySelector(".password-error").innerText = "";

  if(result.message.username) {
    document.querySelector(".username-error").innerText = result.message.username
  }
  if(result.message.first_name){
    document.querySelector(".first-name-error").innerText = result.message.first_name
  }

  if(result.message.last_name) {
    document.querySelector(".last-name-error").innerText = result.message.last_name
  }
  if(result.message.email) {
    document.querySelector(".email-error").innerText = result.message.email
  }
  if(result.message.phone) {
    document.querySelector(".telephone-error").innerText = result.message.phone
    document.querySelector(".contact-phone-error").innerText = result.message.phone

  }
  if(result.message.password) {
    document.querySelector(".password-error").innerText = result.message.password
  }
}

/**
 * Checks if the password and password confirmation match.
 * @returns {boolean} True if passwords match, false otherwise.
 */
function checkPasswords() {
  const password = document.getElementById("password");
  const passwordConfirm = document.getElementById("password-confirm");

  if (password.value == passwordConfirm.value) {
    passwordConfirm.parentElement.classList.remove("has-error");
    passwordConfirm.setCustomValidity("");
    return true;
  }

  passwordConfirm.parentElement.classList.add("has-error");
  passwordConfirm.setCustomValidity("Passwords do not match.");
  return false;
}

/**
 * Checks if the privacy policy acceptance is checked.
 * @returns {boolean} True if privacy policy is accepted, false otherwise.
 */
function checkPrivacy() {
  const acceptPp = document.getElementById("accept-pp");
  const signupButton = document.getElementById("signup-button");

  if (acceptPp.checked) {
    signupButton.disabled = false;
    return true;
  }

  signupButton.disabled = true;
  return false;
}
