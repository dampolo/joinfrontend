async function updateTask(taskId, payload) {  
  const url = `${API_URL}/api/tasks/${taskId}/`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( payload ),
  });
}

async function saveTask(newTask) {
  const url = `${API_URL}/api/tasks/`;
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


async function getAllTasks() {
  const url = `${API_URL}/api/tasks/`;
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

async function deleteTask(taskId) {
  const url = `${API_URL}/api/tasks/${taskId}/`;
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