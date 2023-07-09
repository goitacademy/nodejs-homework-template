const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContactsService = async () => {
  const allContacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(allContacts);
};

const getContactByIdService = async (contactId) => {
  const allContacts = await listContactsService();
  const contactById = allContacts.find((contact) => contact.id === contactId);

  return contactById || null;
};

const removeContactService = async (contactId) => {
  const allContacts = await listContactsService();

  const removedContact = allContacts.find((contact) => {
    return contact.id === contactId;
  });

  if (!removedContact) {
    return null;
  }

  const index = allContacts.indexOf(removedContact);
  allContacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return { message: "contact deleted" };
};

const addContactService = async (body) => {
  const newContact = { ...body, id: nanoid() };

  const allContacts = await listContactsService();
  const updateList = [...allContacts, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(updateList, null, 2));

  return newContact;
};

const updateContactService = async (contactId, body) => {
  const allContacts = await listContactsService();

  const contactById = allContacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    return null;
  }
  const updateContact = { ...contactById, ...body };
  const updateList = allContacts.map((contact) => {
    return contact.id === contactId ? updateContact : contact;
  });

  await fs.writeFile(contactsPath, JSON.stringify(updateList, null, 2));
  return updateContact;
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
