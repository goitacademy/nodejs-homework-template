const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");
const updateContactsList = (contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

const listContacts = async () => {
  const result = await fs.readFile(contactsPath)

  return JSON.parse(result);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const [result] = contacts.filter(contact => contact.id === id)

  return result || null;
};

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact)

  await updateContactsList(contacts);

  return newContact
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id)
  if (index === -1) { return null }

  contacts[index] = { id, name, email, phone };
  await updateContactsList(contacts);

  return contacts[index];
};

const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id)

    if (index === -1) {return null}

    const [result] = contacts.splice(index, 1);
    await updateContactsList(contacts);

    return result || null;
}

const contactsAPI = {
  listContacts,
  getContactById,
  removeContact,
  updateContact,
  addContact,
};

module.exports = contactsAPI;
