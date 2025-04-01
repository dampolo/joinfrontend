/**
 * Retrieves task data from remote storage.
 * @returns {Array} An array of user objects or an empty array if an error occurs.
 */
async function getTasks() {
  let response = await getItem("allTasks");

  if (response.status === "error") return [];

  console.log("getTasks: ", response);

  return response;
}

/**
 * Saves task data to remote storage.
 * @param {Array} tasks - An array of user objects.
 * @returns {boolean} A boolean indicating whether the save operation was successful.
 */
async function saveTasks(taskId, payload) {
  debugger
  return await setItem(taskId, payload).then((result) => {
    if (result.status == "success") return true;
    return false;
  });
}


// COPY

// async function saveTasks(tasks) {
//   return await setItem("allTasks", tasks).then((result) => {
//     if (result.status == "success") return true;
//     return false;
//   });
// }
