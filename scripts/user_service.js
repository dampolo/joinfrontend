async function getUser(username, password) {
  const url = `${API_URL}/auth/login/`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      
      const errorData = await res.json();
      return { status: "error", message: errorData.message[0] };
    }
    const user = await res.json();
    return { status: "success", user };
    
  } catch (error) {
    console.log(error);
    
    debugger
    return { status: "error", message: error.message };
  }
}

async function saveUsers(userData) {
  const url = `${API_URL}/auth/registration/`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      
      return { status: "error", message: errorData };
    }

    const user = await res.json();
    return user
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: "error", message: error.message };
  }
}


/**
 * Saves user data to local storage.
 * @param {Object} user - The user object to be saved.
 */
function saveUserToLocalStorage(user) {
  // console.log(user);
  
  localStorage.setItem("token", JSON.stringify(user));
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
async function logIn(username, password) {  
  if (isLoggedIn()) logOut();
  
  const result = await getUser(username, password);
  if (result.status === "success") {
    saveUserToLocalStorage(result.user);
    return result;
  } else
    return result
}

/**
 * Checks if a user is logged in.
 * @returns {boolean} A boolean indicating whether a user is logged in.
 */
function isLoggedIn() {
  if (localStorage.getItem("token") !== null) return true;
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
  if (isLoggedIn()) return JSON.parse(localStorage.getItem("token"));
  return null;
}
