const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");
// const contactsPath = path.join(__dirname, "models", "contacts.json");

const updateContact = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

async function listContacts () {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data)
}

async function getContactById(contactId) {
  const stringContactId = String(contactId);
  const contacts = await listContacts();

  const result = contacts.find(item => item.id === stringContactId);
  return result || null;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  }

  contacts.push(newContact);
  await updateContact(contacts);

  return newContact;
}

async function updateContactId(id, data) {
  console.log("id", id);
  console.log("data", data);
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);

  if (index === -1) {
    return null
  }
  
  contacts[index] = { id, ...data }
  await updateContact(contacts)

  return contacts[index]
}

async function removeContact(contactId) {
  const stringContactId = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === stringContactId);
  console.log(index);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await updateContact(contacts);
  console.log("result ", result);

  return result;
}


module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactId,
  removeContact
}

