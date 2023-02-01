const fs = require("fs").propmises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const contactsPath = path.resolve("./models/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contactList = JSON.parse(data);
  const [gottenContact] = contactList.filter((item) => item.id === contactId);
  if (!gottenContact) {
    return null;
  }
  return gottenContact;
}

async function removeContact(contactId) {
  const contactList = await listContacts();
  const indexOfContact = contactList.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexOfContact === -1) {
    return null;
  }
  const [deleteContact] = contactList.splice(indexOfContact, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return deleteContact;
}

async function addContact(body) {
  const contactList = await listContacts();
  const id = uuidv4();
  const { name, email, phone } = body;
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(contactList), "utf8");
  return newContact;
}

async function updateContact(contactId, body) {
  const contactList = await listContacts();
  let updatedContact;
  const updatedArray = contactList.map((contact) => {
    if (contact.id === contactId) {
      updatedContact = { ...contact, ...body };
      return updateContact;
    }
    return contact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(updatedArray), "utf8");
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
