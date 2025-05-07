/**
 * Constant representing the token used for remote storage access.
 * @constant {string}
 */
const STORAGE_TOKEN = "N5WAMIGSG8DUOHKFD7VXKHVD6CGSIEVVWLAYN5AL";

/**
 * Constant representing the URL of the remote storage endpoint.
 * @constant {string}
 */
// const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
const fetchGetUserUrl = "http://127.0.0.1:8000/api/users/";
const fetchGetAllTasksUrl = "http://127.0.0.1:8000/api/tasks/";
const fetchLogin = "http://127.0.0.1:8000/auth/login/";
const fetchRegistration = "http://127.0.0.1:8000/auth/registration/";

async function setItem(taskId, payload) {
  const url = `${fetchSetAllTasksUrl}${taskId}/`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ board: payload }),
  });
}

async function getAllTasks() {
  const url = `${fetchGetAllTasksUrl}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Token ${getLoggedInUser().token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const task = await res.json();
  return task;
}

async function getAllContacts() {
  const url = `${fetchGetUserUrl}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const task = await res.json();
  return task;
}

async function getUser(username, password) {
  const url = `${fetchLogin}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const user = await res.json();
    return { status: "success", user };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: "error", message: error.message };
  }
}


async function saveUsers(userData) {
  const url = `${fetchRegistration}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const user = await res.json();
    return user
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: "error", message: error.message };
  }
}

async function saveTask(newTask) {
  const url = `${fetchGetAllTasksUrl}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const task = await res.json();
    return task
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: "error", message: error.message };
  }
}

async function deleteTask(taskId) {
  const url = `${fetchGetAllTasksUrl}${taskId}/`;
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return { status: "success" };

  } catch (error) {
    console.error("Error deleting task:", error);
    return { status: "error", message: error.message };
  }
}