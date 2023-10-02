const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const alllContacts = await fs.readFile(contactsPath);
  return JSON.parse(alllContacts) || null;
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  return allContacts[index];
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log("Contact not found");
    return null;
  }

  const removeContact = allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return removeContact;
};

const addContact = async (body) => {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    ...body,
  };

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    console.log("Contact not found");
    return null;
  }

  allContacts[index].name = body.name;
  allContacts[index].email = body.email;
  allContacts[index].phone = body.phone;

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
