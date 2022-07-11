const fs = require("fs/promises");
const path = require("path");


const contactsPath = (
  path.join('.', 'models', 'contacts.json')
);


const listContacts = () => {
  return fs.readFile(contactsPath).then(data => JSON.parse(data));
};


const getContactById = (id) => {
  return listContacts().then(contacts => contacts.find(contact => contact.id === id));
};


const removeContact = (id) => {
  return listContacts()
    .then(contacts => contacts.filter(contact => contact.id !== id))
    .then(contacts => JSON.stringify(contacts, undefined, 2))
    .then(getContactById(id).then(contact => {
      if (contact) {
        return contact
      }
      return contact
    }))
    .then(json => fs.writeFile(contactsPath, json))

};


const addContact = ({ name, email, phone }) => {
  const getContactWithBiggestId = (contacts) => contacts.sort((a, b) => b.id - a.id)[0];
  const makeId = (contacts) => (parseInt(getContactWithBiggestId(contacts).id) + 1).toString();
  return listContacts()
    .then(contacts => [...contacts, { id: makeId(contacts), name, email, phone }])
    .then(contacts => JSON.stringify(contacts, undefined, 2))
    .then(json => {
      fs.writeFile(contactsPath, json)
      return { name, email, phone }
    });
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
