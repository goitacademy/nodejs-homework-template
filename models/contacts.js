const { nanoid } = require("nanoid");
const { readFile, writeFile } = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    return contact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contactIdToDelete = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (contactIdToDelete === -1) {
      return {
        status: "error",
        code: 404,
        message: "Not found",
      };
    } else {
      contacts.splice(contactIdToDelete, 1);
      const newContacts = JSON.stringify(contacts);
      await writeFile(contactsPath, newContacts);
      return;
    }
  } catch (error) {
    console.error(error);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };
  try {
    const data = await readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    contacts.push(newContact);
    const newContacts = JSON.stringify(contacts);
    await writeFile(contactsPath, newContacts);
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
