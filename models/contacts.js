/* const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const contacts = JSON.parse(
    await fs.readFile(contactsPath, { encoding: "utf-8" })
  );
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    if (!result) {
      return null;
    }
    return result;
  } catch (error) {
    return console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
    const newContact = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContact));
    return contacts[idx];
  } catch (error) {
    return console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const newContact = { id: v4(), name, email, phone };

    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return newContact;
  } catch (error) {
    return console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}; */
