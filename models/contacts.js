const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(id) {
  const allContacts = await listContacts();
  const result = await allContacts.find((contact) => contact.id === id);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(id) {
  const allContacts = await listContacts();
  const resultContacts = await allContacts.filter(
    (contact) => contact.id !== id
  );
  if (resultContacts.length === allContacts.length) {
    return null;
  }
  await updateContacts(resultContacts);
  const newListOfContacts = await listContacts();
  return newListOfContacts;
}

async function addContact({ name, email, phone }) {
  const allContacts = await listContacts();
  const existedContact = await allContacts.filter(
    (contact) => contact.name === name
  );
  if (existedContact) {
    return null;
  }
  const id = ObjectID();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  const totalContacts = [...allContacts, newContact];
  await updateContacts(totalContacts);
  return newContact;
}

async function updateContactById(id, data) {
  const allContacts = await listContacts();
  const untouchedContacts = await allContacts.filter(
    (contact) => contact.id !== id
  );
  if (untouchedContacts.length === allContacts.length) {
    return null;
  }
  let contactToUpdate = await allContacts.filter(
    (contact) => contact.id === id
  );
  contactToUpdate = { ...data, id };
  const totalContacts = [...untouchedContacts, contactToUpdate];
  await updateContacts(totalContacts);
  return totalContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
