const fs = require('fs').promises;
const uuid = require('uuid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, 'utf8');
  const data = JSON.parse(contacts);

  return data;
};
const getContactById = async contactId => {
  const allContacts = await listContacts();

  const contact = allContacts.find(contact => contact.id === contactId);

  return contact ? contact : null;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contactId === contact.id);
  const deletedContact = allContacts[index];
  if (index !== -1) {
    allContacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  }
  return deletedContact ? deletedContact : null;
};

const addContact = async (name, email, phone) => {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contactId === contact.id);
  if (index !== -1) {
    allContacts[index].name = name;
    allContacts[index].email = email;
    allContacts[index].phone = phone;

    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts[index];
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
//
