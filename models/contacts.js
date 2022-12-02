const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

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
  const id = nanoid();
  const newContact = { ...body, id };
  contacts.push(newContact);
  await fs.writeFile(contactParh, JSON.stringify(contacts));
  const addedContact = await getContactById(id);
  return addedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const newContacts = contacts.map(item => {
    return item.id === contactId ? (item = { ...item, ...body }) : item;
  });

  await fs.writeFile(contactParh, JSON.stringify(newContacts));
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
