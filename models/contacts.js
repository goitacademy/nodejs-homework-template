const fs = require('fs/promises');
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  return allContacts;
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  const foundContact =
    allContacts.find((contact) => contact.id === contactId) || null;
  return foundContact;
}

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  const deletedIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (deletedIndex === -1) {
    return null;
  }
  const deletedContact = allContacts.splice(deletedIndex, 1)[0];
  return deletedContact;
}

const addContact = async ( { name, email, phone } ) => {
  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };

  await fs.writeFile(contactsPath, JSON.stringify(newContact, null, 2))
  return newContact;
}

const updateContact = async (contactId, body) => {
  console.log(contactId);
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  const index = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (index === -1) {
    return null;
  }
   
  allContacts[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
