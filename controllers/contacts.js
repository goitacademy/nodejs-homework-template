const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId = "AeHIrLTr6JkxGE6SN-0Rw") => {
  try {
    if (contactId !== -1) {
      const data = await fs.readFile(contactsPath);
      const contacts = JSON.parse(data);
      const contact = contacts.find((c) => c.id === contactId);
      console.log(contact);
      return contact || null;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((el) => el.id === contactId);
    const removedContact = contacts.find((el) => el.id === contactId);
    if (contactIndex === -1) {
      console.log(null);
      return;
    }
    contacts.splice(contactIndex, 1);
    console.log(removedContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    console.log(body);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((el) => el.id === contactId);
  const contact = contacts.find((el) => el.id === contactId);
  if (contactIndex === -1) throw Error("Not found");
  const updatedContact = { ...contact, ...body };
  contacts[contactIndex] = updatedContact;
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
