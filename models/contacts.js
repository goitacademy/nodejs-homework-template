const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  return contacts;
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactToFind = contacts.find((item) => item.id === contactId);
    return !contactToFind ? null : contactToFind;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactToFind = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactToFind === -1) {
      return null;
    }
    const [updatedContacts] = contacts.splice(contactToFind, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContacts;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id.toString() === contactId);

  if (index === -1) {
    console.log(`Contact with ID:"${contactId}" not found...`);
    return null;
  }

  contacts[index] = { ...contacts[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
