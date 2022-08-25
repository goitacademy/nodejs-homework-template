const fs = require("fs/promises");
const contactsPath = require("../../contactsPath/path");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};
const rewriteListContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
};

const getById = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  return contacts[index];
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const isContactName = contacts.find(
      (contact) => contact.name === body.name
    );
    if (isContactName) {
      return true;
    }
    contacts.push(body);
    await rewriteListContacts(contacts);
  } catch (error) {
    return error.message;
  }
};

const removeContact = async (id) => {
  let contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  contacts = contacts.filter((contact) => contact.id !== id);
  await rewriteListContacts(contacts);
  return true;
};

const updateContact = async (id, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) return null;

    contacts[index] = { ...contacts[index], ...body };
    await rewriteListContacts(contacts);

    return contacts[index];
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  listContacts,
  rewriteListContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
