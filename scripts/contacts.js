/**
 * Represents an array of contacts.
 * @type {Array<Object>}
 */
let allContacts = [];

/**
 * Represents the index of the currently selected contact.
 * @type {number|null}
 */

let currentContactIndex = null;

/**
 * Initializes the contacts page.
 * @returns {Promise<void>}
 */
async function contactInit() {
	authGuard();
	await init();
	setNavActive('contacts');

	allContacts = await getAllContacts();

	renderContacts(allContacts);
}

/**
 * Shows the form to create a new contact.
 */
function showCreateContact() {
	let background = document.getElementById('new-contact-bg');
	let formContent = document.getElementById('new-contact-form');

	background.classList.remove('d-none');
	formContent.classList.remove('d-none');
	background.classList.add('fade-in');

	if (innerWidth >= 790) {
		formContent.classList.add('slide-from-right');
	} else {
		formContent.classList.add('slide-from-bottom');
	}

	setTimeout(() => {
		background.classList.remove('fade-in');
		formContent.classList.remove('slide-from-right');
		formContent.classList.remove('slide-from-bottom');
	}, 400);
}

/**
 * Closes the form to create a new contact.
 */
function closeCreateContact() {
	let background = document.getElementById('new-contact-bg');
	let formContent = document.getElementById('new-contact-form');

	background.classList.add('fade-out');

	if (innerWidth >= 790) {
		formContent.classList.add('slide-to-right');
	} else {
		formContent.classList.add('slide-to-bottom');
	}

	setTimeout(() => {
		background.classList.add('d-none');
		formContent.classList.add('d-none');
		background.classList.remove('fade-out');
		formContent.classList.remove('slide-to-right');
		formContent.classList.remove('slide-to-bottom');
	}, 200);
}

/**
 * Shows the form to edit an existing contact.
 * @param {number} index - The index of the contact to be edited.
 */
function showEditContact(index) {
	const background = document.getElementById('edit-contact-bg');
	const editForm = document.getElementById('edit-contact-form');
	const contact = allContacts[index];
	const bgColor = assignColor(contact.name);
	const firstLetters = getnameFirstLetters(allContacts[index].name);

	editForm.innerHTML = editFormTemplate(index, bgColor, firstLetters);

	background.classList.remove('d-none');
	editForm.classList.remove('d-none');
	background.classList.add('fade-in');

	if (innerWidth >= 790) {
		editForm.classList.add('slide-from-right');
	} else {
		editForm.classList.add('slide-from-bottom');
	}

	setTimeout(() => {
		background.classList.remove('fade-in');
		editForm.classList.remove('slide-from-right');
		editForm.classList.remove('slide-from-bottom');
	}, 400);
}

/**
 * Closes the form to edit a contact.
 */
function closeEditContact() {
	const background = document.getElementById('edit-contact-bg');
	const editForm = document.getElementById('edit-contact-form');

	background.classList.add('fade-out');

	if (innerWidth >= 790) {
		editForm.classList.add('slide-to-right');
	} else {
		editForm.classList.add('slide-to-bottom');
	}

	setTimeout(() => {
		background.classList.add('d-none');
		editForm.classList.add('d-none');
		background.classList.remove('fade-out');
		editForm.classList.remove('slide-to-right');
		editForm.classList.remove('slide-to-bottom');
	}, 200);

	closeDeleteConfirmation();
}

/**
 * Adds a new contact.
 * @returns {Promise<void>}
 */
async function addContact() {
	const name = getContactName();
	const email = getContactEmail();
	const phone = getContactPhone();

	const contact = {
		userId: null,
		name: name,
		email: email,
		phone: phone,
	};

	try {
		// allContacts.push(contact);
		await saveSingleContact(contact)
		// await saveContacts(allContacts);
		allContacts = await getAllContacts();
		closeCreateContact();
		deleteValues();
	} catch (error) {
		console.error('Failed to add contact', error);
	}

	renderContacts(allContacts);
	showToast('Contact succesfully created');
}

/**
 * Retrieves the name of the contact from the input field.
 * @returns {string} - The name of the contact.
 */
function getContactName() {
	const name = document.getElementById('contact-name');
	return name.value;
}

/**
 * Retrieves the email of the contact from the input field.
 * @returns {string} - The email of the contact.
 */
function getContactEmail() {
	const email = document.getElementById('contact-email');
	return email.value;
}

/**
 * Retrieves the phone number of the contact from the input field.
 * @returns {string} - The phone number of the contact.
 */
function getContactPhone() {
	const phone = document.getElementById('contact-phone');
	return phone.value;
}

/**
 * Deletes the input field values after adding a contact.
 */
function deleteValues() {
	document.getElementById('contact-name').value = '';
	document.getElementById('contact-email').value = '';
	document.getElementById('contact-phone').value = '';
}

/**
 * Renders the list of contacts.
 * @param {Array<Object>} contacts - The array of contacts to be rendered.
 * @returns {Promise<void>}
 */
async function renderContacts(contacts) {
	console.log(contacts);
	
	const contactListContainer = document.getElementById('contact-list');

	if (!contactListContainer) {
		console.error("Error: Cannot find element with id 'contact-list' in the HTML.");
		return;
	}

	contactListContainer.innerHTML = '';

	try {
		contacts.sort((a, b) => a.name.localeCompare(b.name));
	} catch (error) {
		console.error('Failed to sort names:', error);
	}

	const usedLetters = new Set();

	for (let i = 0; i < contacts.length; i++) {                              
		const contact = contacts[i];
		const contactId = contacts[i].id
		const firstLetter = contact.name[0].toUpperCase();

		if (!usedLetters.has(firstLetter)) {
			contactListContainer.innerHTML += `
            <div class="first-letter-header">
            <span class="firstletter">${firstLetter}</span>
            </div>
            `;
			usedLetters.add(firstLetter);
		}

		bgColor = assignColor(contact.name);
		let nameFirstLetters = getnameFirstLetters(contact.name);
		contactListContainer.innerHTML += contactTemplate(contact, i, bgColor, nameFirstLetters, contactId);
	}
}

/**
 * Renders the contact information.
 * @param {number} index - The index of the contact.
 */
function renderInfo(index, contactId) {
	console.log(index, contactId);
	
	currentContactIndex = index;
	const infoContainer = document.getElementById('info-wrapper');
	const displayContainer = document.getElementById('contacts-display-wrapper');
	const sideBar = document.getElementById('contacts-sidebar-wrapper');
	const contact = allContacts[index];
	const bgColor = assignColor(contact.name);
	const firstLetters = getnameFirstLetters(allContacts[index].name);

	infoContainer.innerHTML = '';
	infoContainer.innerHTML = contactInfoTemplate(index, bgColor, firstLetters, contactId);
	infoContainer.classList.remove('d-none');
	infoContainer.classList.add('slide-from-right');

	displayContainer.classList.remove('d-none');

	if (innerWidth <= 790) {
		sideBar.style.display = 'none';
		displayContainer.classList.add('d-block');
	}
}

/**
 * Closes the mobile view of contact information.
 */
function closeMobileContact() {
	const sideBar = document.getElementById('contacts-sidebar-wrapper');
	const displayContainer = document.getElementById('contacts-display-wrapper');

	displayContainer.style = 'display: none !important';

	if (innerWidth <= 790) {
		sideBar.style.display = 'flex';
		displayContainer.classList.remove('d-block');
	}

	setTimeout(() => {
		displayContainer.style = 'display: none';
	}, 500);
}

/**
 * Shows additional options in the mobile view.
 */
function showMoreOptions() {
	const options = document.getElementById('mobile-more-options');

	options.classList.remove('d-none');
	options.classList.add('slide-from-right');

	setTimeout(() => {
		options.classList.remove('slide-from-right');
	}, 500);
}

/**
 * Closes the additional options in the mobile view.
 */
function closeMoreOptions() {
	const options = document.getElementById('mobile-more-options');

	options.classList.add('slide-to-right');

	setTimeout(() => {
		options.classList.remove('slide-to-right');
		options.classList.add('d-none');
	}, 200);
}

/**
 * Retrieves the first letters of the contact's name.
 * @param {string} name - The name of the contact.
 * @returns {string} - The first letters of the contact's name.
 */
function getnameFirstLetters(name) {
	let splittedName = name.split(' ');
	let firstLetters = name[0].charAt(0).toUpperCase();

	if (splittedName[1]) {
		firstLetters = splittedName[0].charAt(0).toUpperCase() + splittedName[1].charAt(0).toUpperCase();
	}

	return firstLetters;
}

/**
 * Deletes a contact.
 * @param {number} index - The index of the contact to be deleted.
 * @returns {Promise<void>}
 */
async function deleteSingleContact(index, contactId) {
	const content = document.getElementById('info-wrapper');
	if(allContacts[index].userId){
		await deleteUser(allContacts[index].id);
	}
	unassignFromTasks(allContacts[index].id);
	allContacts.splice(index, 1);
	await deleteContact(contactId)
	// await saveContacts(allContacts);
	content.innerHTML = '';
	renderContacts(allContacts);	
	closeEditContact();
	closeDeleteConfirmation();
	showToast('Contact deleted.');
}

/**
 * Updates a contact.
 * @param {Event} event - The event object.
 * @param {number} index - The index of the contact to be updated.
 * @returns {Promise<void>}
 */
async function updateContact(event, index) {
	event.preventDefault();

	const updatedName = document.getElementById('edit-contact-name').value;
	const updatedEmail = document.getElementById('edit-contact-email').value;
	const updatedPhone = document.getElementById('edit-contact-phone').value;

	if (allContacts[index].userId) {
		await updateUser(allContacts[index].userId, updatedName, updatedEmail, updatedPhone);
	}

	allContacts[index].name = updatedName;
	allContacts[index].email = updatedEmail;
	allContacts[index].phone = updatedPhone;
	await saveContacts(allContacts);

	renderContacts(allContacts);
	renderInfo(currentContactIndex);
	closeEditContact();
	closeDeleteConfirmation();
	showToast('Contact edited.');
}


function showDeleteConfirmation(index, contactId) {
	console.log(index, contactId);
	
	let background = document.getElementById('delete-confirmation-bg');
	let content = document.getElementById('delete-confirmation')

	background.classList.remove('d-none');
	background.classList.add('fade-in');
	content.classList.remove('d-none');

	if(innerWidth <= 790){
		content.classList.add('slide-from-bottom')
	}

	setTimeout(() => {
		content.classList.remove('slide-from-bottom');
		background.classList.remove('fade-in');
	}, 300);

	content.innerHTML = '';
	content.innerHTML += deleteConfirmationTemplate(index, contactId);

}


function closeDeleteConfirmation() {
	let background = document.getElementById('delete-confirmation-bg');
	let content = document.getElementById('delete-confirmation')

	background.classList.add('fade-out');	
	content.classList.add('d-none');

	setTimeout(() => {
		background.classList.remove('fade-out');
		background.classList.add('d-none');		
	}, 200);
}

/**
 * Updates a user's information.
 * @param {string} userId - The ID of the user to be updated.
 * @param {string} name - The new name of the user.
 * @param {string} email - The new email of the user.
 * @returns {Promise<void>}
 */
async function updateUser(userId, name, email) {
	let users = await getUsers();
	let user = users.find((user) => user.userId === userId);

	user.name = name;
	user.email = email;
	await saveUsers(users);
}

/**
 * Deletes a user.
 * @param {string} userId - The ID of the user to be deleted.
 * @returns {Promise<void>}
 */
async function deleteUser(userId) {
	let users = await getUsers();
	let userIndex = users.findIndex((user) => user.userId === userId);

	users.splice(userIndex, 1);
	await saveUsers(users);
}

/**
 * Unassigns a contact from all tasks.
 * @param {string} name - The name of the contact to be unassigned.
 * @returns {Promise<void>}
 */
async function unassignFromTasks(id) {
	let tasks = await getAllTasks();
	tasks.forEach((task) => {
		task.assigned_to = task.assigned_to.filter((assignee) => assignee.id !== id);
	});

	// await saveTasks(tasks);
}

/**
 * Prevents event propagation.
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
	event.stopPropagation();
}
