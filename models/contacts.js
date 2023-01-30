const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// console.log("contactsPath////", contactsPath);

async function listContacts() {
  const dbRaw = await fs.readFile(contactsPath);
  const contacts = JSON.parse(dbRaw);
  return contacts;
}

async function addContact(data) {
  const id = nanoid();
  const newContact = { id, ...data };

  // console.log(newContact);
  // console.log(data);
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const findContact = contacts.find((item) => item.id === id);
  if (!findContact) {
    return null;
  }
  const newContacts = contacts.filter((item) => item.id !== id);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  console.log(findContact);
  return findContact;
}

async function getContactById(id) {
  const contacts = await listContacts();
  console.log(id);

  const findContact = contacts.find((item) => item.id === id);
  console.log(findContact);
  return findContact;
}

async function updateContactById(id, data) {
  const contacts = await listContacts();
  let { name, email, phone } = data;
  const idx = contacts.find((item) => item.id === id);
  if (idx === -1) {
    return null;
  }

  !name && (name = idx.name);
  !email && (email = idx.email);
  !phone && (phone = idx.phone);

  contacts[idx] = { id, name, email, phone };
  // console.log(contacts[idx]);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
  updateContactById,
};
