// const fs = require('fs/promises');
// const path = require('path');
// const { nanoid } = require('nanoid');
// // const internal = require('stream');


// const contactsPath = path.join(__dirname, 'contacts.json')

// const listContacts = async () => {
//     const data = await fs.readFile(contactsPath);
//     return JSON.parse(data);
// }

// const getContactById = async(id) => {
//     const contacts = await listContacts();
//     const result = contacts.find(contact => contact.id === id);
//     if (!result) {
//         return null;
//     }
//     return result;

// }

// const addContact = async ({name, email, phone}) => {
//     const contacts = await listContacts();
//     const newContact = {
//         id: nanoid(),
//         name,
//         email,
//         phone,
//     };
//     contacts.push(newContact);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return newContact;
// }


// const removeContact = async (id) => {
//     const contacts = await listContacts();
//     const idx = contacts.findIndex(contact => contact.id === id);
//     if (idx === -1) {
//         return null;
//     }
//     const [result] = contacts.splice(idx, 1);
//     await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//     return result;
// }


// module.exports = {
//     listContacts,
//     getContactById,
//     addContact,
//     removeContact,
// }