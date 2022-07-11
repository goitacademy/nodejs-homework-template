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
    .then(contacts => {
      const targetContact = contacts.find(contact => contact.id === id);
      if (!targetContact) {
        return undefined;
      } else {
        contacts.splice(contacts.indexOf(targetContact), 1);
        const json = JSON.stringify(contacts, undefined, 2);
        return fs.writeFile(contactsPath, json).then(() => targetContact);
      }
    });
};


const addContact = ({ name, email, phone }) => {
  const getContactWithBiggestId = (contacts) => contacts.sort((a, b) => b.id - a.id)[0];
  const makeId = (contacts) => (parseInt(getContactWithBiggestId(contacts).id) + 1).toString();
  return listContacts()
    .then(contacts => {
      const newContact = { id: makeId(contacts), name, email, phone };
      const json = JSON.stringify([...contacts, newContact], undefined, 2);
      return fs.writeFile(contactsPath, json).then(() => newContact);
    });
};


const updateContact = (id, body) => {
  return listContacts()
    .then(contacts => {
      const targetContact = contacts.find(contact => contact.id === id);
      if (!targetContact) {
        return undefined;
      } else {
        Object.assign(targetContact, body);
        const json = JSON.stringify(contacts, undefined, 2);
        return fs.writeFile(contactsPath, json).then(() => targetContact);
      }
    });
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact,
};
