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
const fetchGetUserUrl = "http://127.0.0.1:8000/api/user/";
const fetchGetAllTasksUrl = "http://127.0.0.1:8000/api/";
const fetchSetAllTasksUrl = "http://127.0.0.1:8000/api/allTasks/";

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


async function getItem(key) {
  const url = `${fetchGetAllTasksUrl}${key}`;
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: "error", message: error.message };
  }
}


async function getUser(id) {
  const url = `${fetchGetUserUrl}${id}`;
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    return await res.json();     
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: "error", message: error.message };
  }
}