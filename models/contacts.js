const path = require("path");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const contatcsPath = path.join(__dirname, "contacts.json");

// повертає усі контакти
async function listContacts() {
  const data = await fs.readFile(contatcsPath);
  return JSON.parse(data);
}

//  повертає один контакт за Id
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

// видаляє контакт за Id
async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }

  const [result] = contacts.splice(idx, 1);
  await fs.writeFile(contatcsPath, JSON.stringify(contacts, null, 2));
  return result;
}

// створює новий контакт
async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  fs.writeFile(contatcsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

// оновлює існуючий контакт за Id
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) return null;

  contacts[idx] = { contactId, ...body };
  await fs.writeFile(contatcsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
