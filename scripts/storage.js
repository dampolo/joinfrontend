/**
 * Constant representing the token used for remote storage access.
 * @constant {string}
 */
const STORAGE_TOKEN = "N5WAMIGSG8DUOHKFD7VXKHVD6CGSIEVVWLAYN5AL";

/**
 * Constant representing the URL of the remote storage endpoint.
 * @constant {string}
 */
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * Sets an item in the remote storage.
 * @param {string} key - The key under which the value will be stored.
 * @param {*} value - The value to be stored.
 * @returns {Promise<Object>} A promise that resolves to the response from the remote storage API.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: "POST", body: JSON.stringify(payload) }).then((res) =>
    res.json()
  );
}

/**
 * Retrieves an item from the remote storage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the response from the remote storage API.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then((res) => res.json());
}
