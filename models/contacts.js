const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const newContactList = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (contacts.lenght === newContactList) {
      return false;
    }
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactList, null, 2),
      "utf8"
    );
    return newContactList;
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

const addContact = async (body, res) => {
  const id = nanoid();
  const contacts = await listContacts();
  const newContact = { id, body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
  return newContact;
};

const updateContact = async (contactId, body, res) => {
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath, "utf8"));
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return false;
    }
    contacts.splice(index, 1, { id: contactId, ...body });
    await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    return contacts[index];
  } catch (error) {
    return res.status(500).json({ message: "Internal Error" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
