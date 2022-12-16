const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join('./models', 'contacts.json');
const getContacts = () => fs.readFile(contactsPath);

const listContacts = async () => {
  const contacts = await getContacts();
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  return JSON.parse(contacts).filter((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await getContacts();
  const parsedContacts = JSON.parse(contacts);
  const filteredContacts = parsedContacts.filter(
    (contact) => contact.id !== contactId
  );
  if (filteredContacts.length < parsedContacts.length) {
    const newData = JSON.stringify(filteredContacts);
    fs.writeFile(contactsPath, newData);
    return true;
  }
  return false;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getContacts();
  const parsedContacts = JSON.parse(contacts);

  const newContact = {
    id: `${+parsedContacts[parsedContacts.length - 1].id + 1}`,
    name,
    email,
    phone,
  };
  parsedContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(parsedContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getContacts();
  const parsedContacts = JSON.parse(contacts);
  let updatedContact;

  const updatedContacts = parsedContacts.map((contact) => {
    if (contact.id === contactId) {
      updatedContact = { ...contact, ...body };
      return updatedContact;
    }
    return contact;
  });

  console.log(updatedContact);
  if (updatedContact) {
    fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return updatedContact;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
