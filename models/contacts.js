const fs = require('fs/promises');
const path = require("path");

// const contactsPath = path.format({
//   root: "/ignored",
//   dir: "models",
//   base: "contacts.json",
// });

const contactsPath = path.join(__dirname, 'contacts.json'); 

const listContacts = async () => {
  return fs.readFile(contactsPath).then((contacts) => {
    return JSON.parse(contacts);
  });
};

// const listContacts = async () => {
//   const list = await fs.readFile(contactsPath, 'utf-8');
//   return JSON.parse(list);
// };

const getContactById = async (contactId) => {
  return fs
    .readFile(contactsPath)
    .then((contacts) =>
      JSON.parse(contacts).find((contact) => contact.id === contactId)
    );
};

const removeContact = async (contactId) => {

}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
