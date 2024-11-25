const fs = require("fs/promises");
const path = require("path");
const id = require("bson-objectid");

const contactsPath = path.join(__dirname, "./contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = await allContacts.find(
    (el) => Number(el.id) === Number(contactId)
  );
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(
    (el) => Number(el.id) === Number(contactId)
  );
  console.log(idx);
  if (idx === -1) {
    return null;
  }
  const result = allContacts.splice(idx, 1);
  await updateContacts(allContacts);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: id(),
  };
  allContacts.push(newContact);
  await updateContacts(allContacts);
  return newContact;
};

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex((el) => Number(el.id) === Number(id));
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { ...body, id };
  await updateContacts(allContacts);
  return allContacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
