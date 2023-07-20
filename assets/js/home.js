// const updateButtons = document.querySelectorAll('.update a');
// const updateContactFormContainer = document.getElementById('update-contact-form-container');
// const updateContactForm = document.getElementById('update_contact_form');

// updateButtons.forEach((button) => {
//     button.addEventListener('click', (event) => {
//         event.preventDefault();
//         const contactId = button.getAttribute('href').split('/')[2];
//         if (updateContactForm) {
//             updateContactForm.action = `/update-contact/${contactId}`;
//             updateContactFormContainer.style.display = 'block';
//         } else {
//             console.error('updateContactForm is null or undefined.');
//         }
//     });
// });

// if (updateContactForm) {
//     updateContactForm.addEventListener('submit', () => {
//         updateContactFormContainer.style.display = 'none';
//     });
// }
