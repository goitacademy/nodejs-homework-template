const fs = require('fs/promises')
const contactsPath = require('./contactsPath')

const listContacts = async () => {
  const contactsData = await fs.readFile(contactsPath, 'utf-8')
  return JSON.parse(contactsData);
};

const getContactById = async (contactId) => {
  const contactsData = await listContacts();
  return contactsData.find(contact => contact.id === Number(contactId))
};

const removeContact = async (contactId) => {
  const contactsData = await listContacts();
  const idx = contactsData.findIndex((item) => item.id === Number(contactId));
  if (idx === -1) {
    return null;
  }
  const dataUpdate = contactsData.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(dataUpdate));
  return listContacts();
};

const addContact = async (name, email, phone) => {
  const randomId = Math.floor(Math.random() * (500 - 50) + 1);
  const contactsData = await listContacts();
  const newContact = { id: randomId, name, email, phone }
  contactsData.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contactsData, null, 2), 'utf-8')

  return contactsData;
};

const updateContactById = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === Number(contactId));

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  await updateContacts(contacts);
  return updatedContact;
};

const updateContacts = async (newContact) => {
  await fs.writeFile(contactsPath, JSON.stringify(newContact));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
