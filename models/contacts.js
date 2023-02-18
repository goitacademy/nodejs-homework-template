const fs = require('fs/promises');
const path = require('path');
const contactPath = path.join(__dirname, "./contacts.json");

const getAll = async() => {
  return JSON.parse(await fs.readFile(contactPath,"utf-8"));
};

const listContacts = async () => {
  const listOfContacts = await getAll();
  return listOfContacts;
};

const getContactById = async (contactId) => {
  const listOfContacts = await getAll();
  const contact = listOfContacts.find(el => el.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const listOfContacts = await getAll();
  return listOfContacts.filter((item) => {
    return contactId.toString() !== item.id;
  });
};

const addContact = async (name,phone,email) => {
  const listOfContacts = await getAll();
  const newContact = {
    name,
    email,
    phone,
    id: (listOfContacts.length + 1).toString(),
  };
  listOfContacts.push(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const listOfContacts = await getAll();
  const index = listOfContacts.findIndex((item) => {
    return item.id === contactId;
  });
  const updatedContact = { ...listContacts[index], ...body };
  listContacts[index] = updatedContact;
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
