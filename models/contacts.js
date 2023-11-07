const fs = require("fs/promises");
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

async function writeContacts(contacts) {
  return await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, undefined, 2)
  );
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId
  );
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (index === -1) {
    return null;
  }

  contacts.splice(index, 1);
  await writeContact(contacts);
  return contacts;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await writeContact(contacts);

  console.log(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, ...body };
  await writeContacts(contacts);

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
