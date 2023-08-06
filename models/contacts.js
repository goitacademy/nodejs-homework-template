// const fs = require('fs/promises')
const path = require('path');
const fs = require('fs').promises;
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactsId = contacts.filter(contact => contact.id === contactId);
  return contactsId;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const id = contacts.findIndex(({ id }) => {
    id === contactId
  });
  const deleteContact = contacts.splice(id, 1);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deleteContact;
  } catch (error) {
    console.error(error);
  }
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    body
  }
  contacts.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  } catch (error) {
    console.error(error)
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.filter(contact => contact.id === contactId);
  contacts[index] = { contactId, ...body};

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return contacts[index];
  }catch(error) {
    console.error(error)
  }

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
