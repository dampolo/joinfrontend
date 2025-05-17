async function getAllContacts() {
  const url = `${API_URL}/api/users/`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const contact = await res.json();
  return contact;
}

async function getSingleContacts(userId) {
  const url = `${API_URL}/api/users/${userId}/`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }
  const user = await res.json();
  return user;
}

async function updateSingleContact(id, payload) {  
  const url = `${API_URL}/api/users/${id}/`;
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify( payload ),
  });
}

async function saveSingleContact(newContact) {
  const url = `${API_URL}/api/users/`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContact),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const contact = await res.json();
    return contact
  } catch (error) {
    console.error("Error fetching data:", error);
    return { status: "error", message: error.message };
  }
}

async function deleteContact(id) {
  const url = `${API_URL}/api/users/${id}/`;
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