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
  
  // let users = await getUsers();
  // let contacts = await getContacts();

  // if (users.length > 0) {
  //   userId = users.slice(-1)[0].userId + 1;
  // }

  // users.push({ userId, name, email, password });
  // contacts.push({ userId, name, email, phone: "" });

  if ( await saveUsers(userData)) {
    showToast("You signed up successfully.");
    setTimeout(() => {
      window.location.href = "index.html?registered=true";
    }, 2500);
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
