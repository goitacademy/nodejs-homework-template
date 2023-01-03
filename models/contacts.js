const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./models/contacts.json");

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

async function writeContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, " ", 2));
  } catch (error) {
    console.log(error);
    process.exit(2);
  }
}

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );
  await writeContacts(updatedContacts);
};

const addContact = async (body) => {
  const id = nanoid(10);
  const contact = { id, ...body };
  const contacts = await readContacts();
  contacts.push(contact);
  await writeContacts(contacts);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const updatedContact = contacts.find((item) => item.id === contactId);
  let updatedContacts = contacts.filter((contact) => contact.id !== contactId);
  updatedContacts.push({ ...updatedContact, ...body });
  await writeContacts(updatedContacts);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
