const fs = require('fs/promises');
const path = require('path');

const contactParh = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const contactList = await fs.readFile(contactParh);
  return JSON.parse(contactList);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  return contact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    item => item.id === String(contactId)
  );
  if (contactIndex === -1) {
    return null;
  }
  const deletedContact = contacts.splice(contactIndex, 1);
  await fs.writeFile(contactParh, JSON.stringify(contacts));
  return deletedContact;
};

const addContact = async body => {
  const contacts = await listContacts();
  contacts.push(body);
  await fs.writeFile(contactParh, JSON.stringify(contacts));
  const newContact = getContactById(body.id);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(item => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const newContact = { ...body, id: contactId };
  contacts.splice(contactIndex, 1, newContact);

  await fs.writeFile(contactParh, JSON.stringify(contacts));
  const updatedContact = await getContactById(contactId);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
