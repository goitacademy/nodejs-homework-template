const fs = require('fs/promises')

const listContacts = async () => {
  const contacts = await fs.readFile('./models/contacts.json');
  const parse = JSON.parse(contacts);
  return parse;
}


const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
}


const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const removeIndex = contacts.findIndex((el) => el.id === contactId);
  if (removeIndex !== -1) {
    const delCont = contacts.splice(removeIndex, 1);
    return { contacts, delCont };
  }
}


const addContact = async (body) => {
  const contacts = await listContacts();
  contacts.push(body);
  return contacts;
}


const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const removeIndex = contacts.findIndex((el) => el.id === contactId);
  if (removeIndex !== -1) {
    contacts.splice(removeIndex, 1);
    contacts.push(body);
    return contacts
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
