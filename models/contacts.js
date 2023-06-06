const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const response = await fs.readFile(contactsPath);

    return JSON.parse(response);
  } catch (err) {}
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();

    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (err) {}
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();

    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) return null;
    const [result] = contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (err) {}
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);

  const updatedContact = { ...result, ...body };

  contacts.push(updatedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
