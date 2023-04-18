const fs = require('fs/promises')
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  console.log(contact)
  return contact;
};

const updateContacts = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      return undefined;
    }
    contacts[idx] = { ...contacts[idx], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[idx];
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  try {
    const deleteIndex = contacts.map((contact) => contact.id).indexOf(contactId);
    contacts.splice(deleteIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts;
  }
  catch (err) {console.log(err)}
}

const addContact = async ({name, email, phone}) => {
    const contacts = await listContacts();
    const newContact = { id: nanoid(8), name: name, email: email, phone: phone };
    console.log(newContact);
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
}
