const fs = require("fs/promises");
const { v4: uuid4 } = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = await contacts.find(
    ({ id }) => id.toString() === contactId
  );
  console.table(contactById);
  return contactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id.toString() === contactId);
  if (!contact) return;
  const newContacts = await contacts.filter(
    ({ id }) => id.toString() !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));

  return contact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uuid4(), ...body };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newContacts, null, 2),
    "utf8"
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let contact = contacts.find(({ id }) => id.toString() === contactId);
  if (!contact) return;
  const updateContact = { ...contact, ...body };
  const updateContactsList = contacts.map((item) =>
    item.id.toString() === contact.id.toString() ? updateContact : item
  );

  await fs.writeFile(
    contactsPath,
    JSON.stringify(updateContactsList, null, 2),
    "utf8"
  );
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
