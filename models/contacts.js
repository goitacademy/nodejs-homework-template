const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const result = contactList.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const result = contactList.findIndex((contact) => contact.id === contactId);
  if (result === -1) {
    return null;
  }
  const [removeContact] = contactList.splice(result, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return removeContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contactList = await listContacts();
  const contactId = Number(contactList[contactList.length - 1].id) + 1;
  const newContact = {
    id: contactId.toString(),
    name,
    email,
    phone,
  };
  contactList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactList));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contactList = await listContacts();
  const contactIndex = contactList.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  if (contactIndex !== -1) {
    contactList[contactIndex].name = name;
    contactList[contactIndex].email = email;
    contactList[contactIndex].phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(contactList));
    return contactList[contactIndex];
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
