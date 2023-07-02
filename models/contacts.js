const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const parseAllContacts = JSON.parse(allContacts);
  const contactById = parseAllContacts.find(
    (contact) => contact.id === contactId
  );

  return contactById || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const parseAllContacts = JSON.parse(allContacts);

  const removedContact = parseAllContacts.find((contact) => {
    return contact.id === contactId;
  });

  if (!removedContact) {
    return null;
  }

  const index = parseAllContacts.indexOf(removedContact);
  parseAllContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(parseAllContacts, null, 2));

  return { message: "contact deleted" };
};

const addContact = async (body) => {
  const newContact = { ...body, id: nanoid() };

  const allContacts = await listContacts();
  const parseAllContacts = JSON.parse(allContacts);
  const updateList = [...parseAllContacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(updateList, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const parseAllContacts = JSON.parse(allContacts);
  const contactById = parseAllContacts.find(
    (contact) => contact.id === contactId
  );
  if (!contactById) {
    return null;
  }
  const updateContact = { ...contactById, ...body };
  const updateList = parseAllContacts.map((contact) => {
    return contact.id === contactId ? updateContact : contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(updateList, null, 2));
  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
