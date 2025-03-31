/**
 * Initializes the privacy policy page.
 * This function first initializes certain components asynchronously and sets the navigation active state to "privacy-policy".
 * If the user is not logged in, it hides the main navigation.
 * @returns {Promise<void>} A Promise that resolves when initialization is complete.
 */
async function initPrivacyPolicy() {
  await init(false);
  setNavActive("privacy-policy");

  if (!isLoggedIn()) {
    document.getElementById("aside-main-nav").style.display = "none";
  }
}
