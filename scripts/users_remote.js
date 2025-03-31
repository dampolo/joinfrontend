/**
 * Retrieves user data from remote storage.
 * @returns {Array} An array of user objects or an empty array if an error occurs.
 */
async function getUsers() {
  let response = await getItem("users");
  if (response.status == "error") return new Array();
  return JSON.parse(response.data.value);
}

/**
 * Saves user data to remote storage.
 * @param {Array} users - An array of user objects.
 * @returns {boolean} A boolean indicating whether the save operation was successful.
 */
async function saveUsers(users) {
  return await setItem("users", users).then((result) => {
    if (result.status == "success") return true;
    return false;
  });
}

/**
 * Saves user data to local storage.
 * @param {Object} user - The user object to be saved.
 */
function saveUserToLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

/**
 * Removes user data from local storage.
 */
function removeUserFromLocalStorage() {
  localStorage.removeItem("user");
}

/**
 * Logs in a user.
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 * @param {boolean} [guest=false] - Indicates whether to use a Guest Account (optional, default is false).
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether the login was successful.
 */
async function logIn(email, password, guest = false) {
  if (isLoggedIn()) logOut();

  if (guest) {
    var guestUser = { userId: 0, name: "Guest", email: null, password: null };
    saveUserToLocalStorage(guestUser);
    return true;
  }

  let users = await getUsers();
  let userToLogIn = users.find((user) => user.email == email && user.password == password);

  if (userToLogIn) {
    saveUserToLocalStorage(userToLogIn);
    return true;
  }

  return false;
}

/**
 * Checks if a user is logged in.
 * @returns {boolean} A boolean indicating whether a user is logged in.
 */
function isLoggedIn() {
  if (localStorage.getItem("user") !== null) return true;
  return false;
}

/**
 * Logs out the user.
 */
function logOut() {
  if (isLoggedIn()) {
    removeUserFromLocalStorage();
  }
  return true;
}

/**
 * Retrieves the logged-in user data stored in local storage.
 * @returns {string|null} The user data stored in local storage or null if none exists.
 */
function getLoggedInUser() {
  if (isLoggedIn()) return JSON.parse(localStorage.getItem("user"));
  return null;
}
