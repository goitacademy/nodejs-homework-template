const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

async function readContacts() {
  const listRow = await fs.readFile(contactsPath);
  const listContacts = JSON.parse(listRow);
  return listContacts;
}

async function writeContacts(list) {
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
}

async function listContacts({ limit = 0 }) {
  const listContacts = await readContacts();
  return listContacts.slice(-limit);
}

async function getContactById(contactId) {
  const list = await readContacts();
  const contact = list.find((contact) => {
    if (contact.id === contactId) {
      console.log(`Get contact by ID ${contactId}:`);
      console.table(contact);
      return contact;
    }
  });
  return contact;
}

async function removeContact(contactId) {
  const list = await readContacts();
  const remove = list.filter((contact) => contact.id != contactId);
  await writeContacts(remove);
}

async function addContact(name, email, phone) {
  const id = nanoid();
  const contact = { id, name, email, phone };

  const list = await readContacts();
  list.push(contact);

  await writeContacts(list);

  return contact;
}

async function updateContact(contactId, body) {
  const { name, email, phone } = body;

  const contacts = await readContacts();

  const [contactToUpdate] = contacts.filter((item) => item.id === contactId);

  contactToUpdate.name = name;
  contactToUpdate.email = email;
  contactToUpdate.phone = phone;

  const newContacts = [...contacts];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return contactToUpdate;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
