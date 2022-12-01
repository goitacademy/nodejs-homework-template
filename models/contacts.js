const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");
const listContacts = async () => {
  const contactListBuffer = await fs.readFile(contactsPath);
  const contactList = JSON.parse(contactListBuffer);
  return contactList;
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contactById = contactList.find(({ id }) => id === contactId.toString());
  if (!contactById) {
    return null;
  }
  // console.log(contactById);
  return contactById;
};

const removeContact = async (contactId) => {};

async function addContact(body) {
  const contactList = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return newContact;
}

const updateContact = async (contactId, body) => {};
// getContactById(3);
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
