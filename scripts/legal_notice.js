/**
 * Initializes the legal notice page.
 * This function first initializes certain components asynchronously and sets the navigation active state to "notice page".
 * If the user is not logged in, it hides the main navigation.
 * @returns {Promise<void>} A Promise that resolves when initialization is complete.
 */
async function initLegalNotice() {
  await init(false);
  setNavActive("legal-notice");

  if (!isLoggedIn()) {
    document.getElementById("aside-main-nav").style.display = "none";
  }
}
