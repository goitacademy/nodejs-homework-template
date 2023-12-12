const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./", "models", "contacts.json");

const readContacts = async () => {
  try {
    const contactsData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contactsData);
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

const writeContacts = async (contacts) => {
  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error(error.message);
  }
};

const listContacts = async () => {
  return await readContacts();
};

const getById = async (id) => {
  const contacts = await readContacts(id);
  return contacts.find((contact) => contact.id === id);
};

const removeContact = async (id) => {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  if (contacts.length !== updatedContacts.length) {
    await writeContacts(updatedContacts);
    return true;
  }
  return false;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContacts();
  const newContact = { id: Date.now().toString(), name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], name, email, phone };
    await writeContacts(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
