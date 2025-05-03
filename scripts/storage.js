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
const fetchGetAllTasksUrl = "http://127.0.0.1:8000/api/tasks";
const fetchLogin = "http://127.0.0.1:8000/auth/login/";


async function setItem(taskId, payload) {
  debugger
  const url = `${fetchSetAllTasksUrl}${taskId}/`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({board: payload}),
  })}


  


async function getAllTasks() {
  const url = `${fetchGetAllTasksUrl}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      'Authorization': `Token ${getLoggedInUser().token}`,
      'Content-Type': 'application/json',
    },
  })
  if(!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const task = await res.json()
  return task
}
 

async function getAllContacts() {
  const url = `${fetchGetUserUrl}`;
  const res = await fetch(url);

  // const res = await fetch(url, {
  //   method: "GET",
  //   headers: {
  //     'Authorization': `Token ${getLoggedInUser().token}`,
  //     'Content-Type': 'application/json',
  //   },
  // })
  if(!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const task = await res.json()
  return task
}


async function getUser(username, password) {
  const url = `${fetchLogin}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password })
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
