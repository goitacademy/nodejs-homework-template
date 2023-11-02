const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const serchedContact = allContacts.find(
    (contact) => contact.id === contactId
  );

  return serchedContact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);

  const foundContact = allContacts.find((contact) => contact.id === contactId);

  if (!foundContact) {
    return false;
  }

  const filterContacts = allContacts.filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(filterContacts, null, 2));
  return true;
};

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);

  const newContact = { id: nanoid(), ...body };
  allContacts.push(newContact);

  const addNewContact = await fs.writeFile(
    contactsPath,
    JSON.stringify(allContacts)
  );
  return addNewContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);

  const findContactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (findContactIndex === -1) {
    return false;
  }

  allContacts[findContactIndex].name = body.name;
  allContacts[findContactIndex].email = body.email;
  allContacts[findContactIndex].phone = body.phone;

  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return allContacts[findContactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
