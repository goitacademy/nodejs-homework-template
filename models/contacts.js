const fs = require("fs/promises");

const uuid = require("uuid");
const path = require("path");

const contactsPath = path.join(__dirname, "routes", "api", "contacts.json");

const listContacts = async () => {
  const dataString = await fs.readFile(contactsPath, "utf-8");
  const data = JSON.parse(dataString);
  return data;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts(contactsPath);
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact ?? null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts(contactsPath);
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  } else {
    allContacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts;
  }
};

const addContact = async (body) => {
  body.id(uuid.v4());
  const allContacts = await listContacts(contactsPath);
  allContacts.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts(contactsPath);
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex !== -1) {
    allContacts[contactIndex].name = body.name;
    allContacts[contactIndex].email = body.email;
    allContacts[contactIndex].phone = body.phone;
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return allContacts;
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
