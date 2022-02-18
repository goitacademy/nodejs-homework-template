const fs = require('fs/promises')
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);

  if (!contact) {
    return null;
  }

  return contact;
}

const removeContact = async (contactId) => {
  
}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

// async function listContacts() {
//     const data = await fs.readFile(contactsPath);
//     return contacts = JSON.parse(data);
// }

// async function updateContacts(newContacts) {
//     const contactsString = JSON.stringify(newContacts);
//     await fs.writeFile(contactsPath, contactsString)
// }

// async function getContactById(contactId) {
//     const contacts = await listContacts();
//     const contact = contacts.find(contact => contact.id === contactId);
//     if (!contact) {
//         return null
//     };
//     return contact; 
// }

// async function addContact(name, email, phone) {
//     const contacts = await listContacts();
//     const newContact = {name, email, phone, id: v4()}
//     await updateContacts([...contacts, newContact])
//     return newContact;
// }

// async function removeContact(contactId) {
//     const contacts = await listContacts();
//     const contactIdx = contacts.findIndex(contact => contact.id === contactId);
//     if (contactIdx === -1) {
//         return null
//     }
//     const removedContact = contacts.splice(contactIdx, 1);
//     await updateContacts(contacts)
//     return removedContact
// }