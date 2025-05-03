/**
 * Retrieves task data from remote storage.
 * @returns {Array} An array of user objects or an empty array if an error occurs.
 */
// async function getContacts() {
//     let response = await getItem('contacts');
//     if (response.status == 'error') return new Array();
//     return JSON.parse(response.data.value);
// }

/**
 * Saves task data to remote storage.
 * @param {Array} contacts - An array of user objects.
 * @returns {boolean} A boolean indicating whether the save operation was successful.
 */
// async function saveContacts(contacts) {
//     return await setItem('contacts', contacts).then((result) => {
//         if (result.status == 'success') return true;
//         return false;
//     });
// }
