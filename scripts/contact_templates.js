/**
 * Generates HTML template for displaying a contact.
 *
 * @param {Object} contact - The contact object containing name, email, and userId.
 * @param {number} i - The index of the contact.
 * @param {string} color - The background color for the avatar.
 * @param {string} firstLetters - The initials of the contact's name.
 * @returns {string} The HTML template for the contact.
 */
function contactTemplate(contact, i, color, firstLetters, id) {
    const loggedInUser = getLoggedInUser().username + " " + getLoggedInUser().last_name;
    
    
    return /*html*/ `
    <div class="contact-wrap" tabindex="${i}" onclick="renderInfo(${i}, ${id})">
        <div class="avatar accent-1" style="background-color: ${color}" id="background${i}">${firstLetters}</div>
        <div class="contact-data">
            <span class="contact-name capitalize">${contact.name}
                ${contact.name === loggedInUser ? '(You)' : ''}
            </span>
            <a href="mailto:${contact.email}" class="contact-email">${contact.email}</a>
        </div>
    </div>
    `;
}

/**
 * Generates HTML template for displaying additional contact information.
 *
 * @param {number} index - The index of the contact.
 * @param {string} color - The background color for the avatar.
 * @param {string} firstLetters - The initials of the contact's name.
 * @returns {string} The HTML template for additional contact information.
 */
function contactInfoTemplate(index, color, firstLetters, id) {
    return /*html*/ `

    <div class="more-options-wrapper" onclick="doNotClose(event)">
        
        <div class="mobile-more-options d-none" id="mobile-more-options">
            <div class="edit-options-mobile">
                <div class="option-icon-wrap">
                    <div class="option-icon" onclick="showEditContact(${index}, ${id})">
                        <div class="svg-wrap">
                            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647" />
                            </svg>
                        </div>
                        Edit
                    </div>
                </div>
                <div class="option-icon-wrap">
                    <div class="option-icon" onclick="showDeleteConfirmation(${index}, ${id})">
                        <div class="svg-wrap">
                            <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647" />
                            </svg>
                        </div>
                        Delete
                    </div>
                </div>
            </div>
        </div>


        <div class="mobile-option-button-wrap">
            <div class="button more-button" onclick="showMoreOptions()">
                <svg class="pointer" width="6" height="22" viewBox="0 0 6 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.99967 21.6666C2.26634 21.6666 1.63856 21.4055 1.11634 20.8833C0.594119 20.361 0.333008 19.7333 0.333008 18.9999C0.333008 18.2666 0.594119 17.6388 1.11634 17.1166C1.63856 16.5944 2.26634 16.3333 2.99967 16.3333C3.73301 16.3333 4.36079 16.5944 4.88301 17.1166C5.40523 17.6388 5.66634 18.2666 5.66634 18.9999C5.66634 19.7333 5.40523 20.361 4.88301 20.8833C4.36079 21.4055 3.73301 21.6666 2.99967 21.6666ZM2.99967 13.6666C2.26634 13.6666 1.63856 13.4055 1.11634 12.8833C0.594119 12.361 0.333008 11.7333 0.333008 10.9999C0.333008 10.2666 0.594119 9.63881 1.11634 9.11659C1.63856 8.59436 2.26634 8.33325 2.99967 8.33325C3.73301 8.33325 4.36079 8.59436 4.88301 9.11659C5.40523 9.63881 5.66634 10.2666 5.66634 10.9999C5.66634 11.7333 5.40523 12.361 4.88301 12.8833C4.36079 13.4055 3.73301 13.6666 2.99967 13.6666ZM2.99967 5.66659C2.26634 5.66659 1.63856 5.40547 1.11634 4.88325C0.594119 4.36103 0.333008 3.73325 0.333008 2.99992C0.333008 2.26659 0.594119 1.63881 1.11634 1.11659C1.63856 0.594363 2.26634 0.333252 2.99967 0.333252C3.73301 0.333252 4.36079 0.594363 4.88301 1.11659C5.40523 1.63881 5.66634 2.26659 5.66634 2.99992C5.66634 3.73325 5.40523 4.36103 4.88301 4.88325C4.36079 5.40547 3.73301 5.66659 2.99967 5.66659Z" fill="white" />
                </svg>
            </div>
        </div>
    </div>
    <div class="contact-info-header">
    
        <div class="avatar accent-1 contact-info-avatar" style="background-color: ${color}">
            <span>${firstLetters}</span>
        </div>
        <div class="name-and-options">
            <h2 class="contact-info-name capitalize">${allContacts[index].name}</h2>
            <div class="edit-options">
                <div class="option-icon" onclick="showEditContact(${index}, ${id})">
                    <div class="svg-wrap">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 17H3.4L12.025 8.375L10.625 6.975L2 15.6V17ZM16.3 6.925L12.05 2.725L13.45 1.325C13.8333 0.941667 14.3042 0.75 14.8625 0.75C15.4208 0.75 15.8917 0.941667 16.275 1.325L17.675 2.725C18.0583 3.10833 18.2583 3.57083 18.275 4.1125C18.2917 4.65417 18.1083 5.11667 17.725 5.5L16.3 6.925ZM14.85 8.4L4.25 19H0V14.75L10.6 4.15L14.85 8.4Z" fill="#2A3647" />
                        </svg>
                    </div>
                    Edit
                </div>
                <div class="option-icon" onclick="showDeleteConfirmation(${index}, ${id})">
                    <div class="svg-wrap">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 18C2.45 18 1.97917 17.8042 1.5875 17.4125C1.19583 17.0208 1 16.55 1 16V3C0.716667 3 0.479167 2.90417 0.2875 2.7125C0.0958333 2.52083 0 2.28333 0 2C0 1.71667 0.0958333 1.47917 0.2875 1.2875C0.479167 1.09583 0.716667 1 1 1H5C5 0.716667 5.09583 0.479167 5.2875 0.2875C5.47917 0.0958333 5.71667 0 6 0H10C10.2833 0 10.5208 0.0958333 10.7125 0.2875C10.9042 0.479167 11 0.716667 11 1H15C15.2833 1 15.5208 1.09583 15.7125 1.2875C15.9042 1.47917 16 1.71667 16 2C16 2.28333 15.9042 2.52083 15.7125 2.7125C15.5208 2.90417 15.2833 3 15 3V16C15 16.55 14.8042 17.0208 14.4125 17.4125C14.0208 17.8042 13.55 18 13 18H3ZM3 3V16H13V3H3ZM5 13C5 13.2833 5.09583 13.5208 5.2875 13.7125C5.47917 13.9042 5.71667 14 6 14C6.28333 14 6.52083 13.9042 6.7125 13.7125C6.90417 13.5208 7 13.2833 7 13V6C7 5.71667 6.90417 5.47917 6.7125 5.2875C6.52083 5.09583 6.28333 5 6 5C5.71667 5 5.47917 5.09583 5.2875 5.2875C5.09583 5.47917 5 5.71667 5 6V13ZM9 13C9 13.2833 9.09583 13.5208 9.2875 13.7125C9.47917 13.9042 9.71667 14 10 14C10.2833 14 10.5208 13.9042 10.7125 13.7125C10.9042 13.5208 11 13.2833 11 13V6C11 5.71667 10.9042 5.47917 10.7125 5.2875C10.5208 5.09583 10.2833 5 10 5C9.71667 5 9.47917 5.09583 9.2875 5.2875C9.09583 5.47917 9 5.71667 9 6V13Z" fill="#2A3647" />
                        </svg>
                    </div>
                    Delete
                </div>
            </div>
        </div>
    </div>
  
    <h3 class="contact-info-subheader">Contact Information</h3>
    
    <div class="contact-info-wrap" onclick="doNotClose(event)">
        <h4>Email</h4>
        <a href="mailto:${allContacts[index].email}" class="contact-info-subline">${allContacts[index].email}</a>
        <h4>Phone</h4>
        <span class="contact-info-subline">${allContacts[index].phone}</span>
    </div>
       
    `;
}

/**
 * Generates HTML template for editing a contact.
 *
 * @param {number} index - The index of the contact.
 * @param {string} bgColor - The background color for the avatar.
 * @param {string} firstLetters - The initials of the contact's name.
 * @returns {string} The HTML template for editing a contact.
 */
function editFormTemplate(index, bgColor, firstLetters, id) {
    return /*html*/ `
    <div class="edit-contact-hero" onclick="doNotClose(event)">
        <div class="close-btn-wrap-mobile d-none">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="pointer" xmlns="http://www.w3.org/2000/svg" onclick="closeEditContact()">
                <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="white" />
            </svg>
        </div>
        <img class="hero-logo hidden-on-mobile" src="./assets/img/logo.svg" alt="" />
        <div class="edit-contact-hero-text">
            <h1 class="hero-header">Edit contact</h1>
    
            <div class="hero-horizontal-line">
                <svg width="94" height="3" viewBox="0 0 94 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M92 1.5L2 1.5" stroke="#29ABE2" stroke-width="3" stroke-linecap="round" />
                </svg>
            </div>
        </div>
    </div>
    <div class="edit-contact-form-wrapper" onclick="doNotClose(event)">
        <div class="close-btn-wrap">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="closeEditContact()">
                <path d="M7.00005 8.40005L2.10005 13.3C1.91672 13.4834 1.68338 13.575 1.40005 13.575C1.11672 13.575 0.883382 13.4834 0.700049 13.3C0.516715 13.1167 0.425049 12.8834 0.425049 12.6C0.425049 12.3167 0.516715 12.0834 0.700049 11.9L5.60005 7.00005L0.700049 2.10005C0.516715 1.91672 0.425049 1.68338 0.425049 1.40005C0.425049 1.11672 0.516715 0.883382 0.700049 0.700049C0.883382 0.516715 1.11672 0.425049 1.40005 0.425049C1.68338 0.425049 1.91672 0.516715 2.10005 0.700049L7.00005 5.60005L11.9 0.700049C12.0834 0.516715 12.3167 0.425049 12.6 0.425049C12.8834 0.425049 13.1167 0.516715 13.3 0.700049C13.4834 0.883382 13.575 1.11672 13.575 1.40005C13.575 1.68338 13.4834 1.91672 13.3 2.10005L8.40005 7.00005L13.3 11.9C13.4834 12.0834 13.575 12.3167 13.575 12.6C13.575 12.8834 13.4834 13.1167 13.3 13.3C13.1167 13.4834 12.8834 13.575 12.6 13.575C12.3167 13.575 12.0834 13.4834 11.9 13.3L7.00005 8.40005Z" fill="#2A3647" />
            </svg>
        </div>
        <div class="edit-contact-form">
            <div class="avatar edit-contact-avatar" style="background-color: ${bgColor}">
                <span class="contact-name capitalize">${firstLetters}</span>
            </div>
            <div class="form-wrapper">
                <form onsubmit="updateContact(event, ${index}, ${id}); return false">
                    <input type="text" class="name-input" id="edit-contact-name" value="${allContacts[index].name}" required/>
                    <input type="email" class="email-input" id="edit-contact-email" value="${allContacts[index].email}" required/>
                    <input type="tel" class="phone-input" id="edit-contact-phone" value="${allContacts[index].phone}" required pattern="[0-9+\s]{6,20}" oninvalid="this.setCustomValidity('Enter valid phone number e.g. +49 123 34533323. Minimum 6 digits, maximum 20 digits')" oninput="this.setCustomValidity('')"/>
                    <div class="edit-contact-buttons-wrap">
                        <button class="button cancel outline" onclick="showDeleteConfirmation(${index}, ${id}); return false">
                            Delete
                        </button>
                        <button class="button check" type="submit">
                            Save
                            <svg width="29" height="22" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.02832 15.0001L15.2571 26.0662L33.9717 3.93408" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div class="space-container"></div>
    </div>
    `;
}

function deleteConfirmationTemplate(index, id) {
    return /*html*/ `
        <h3 class="delete-confirmation-header">Delete contact?</h3>
		<div class="buttons-wrapper">
			<button class="button delete-button" onclick="deleteSingleContact(${index}, ${id})">Delete</button>
			<button class="button" onclick="closeDeleteConfirmation()">Close</button>
		</div>
    `;
}
