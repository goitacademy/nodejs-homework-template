const { randomUUID } = require("crypto");
const fs = require("fs/promises");
const path = require("path");
const contactPath = path.join(process.cwd(), "models", "contacts.json");

const listContactsService = async () => {
  const jsonData = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(jsonData);
};

const getContactByIdService = async (id) => {
  const contacts = await listContactsService();
  const contact = contacts.find((contact) => contact.id === id);
  if (!contact) {
    throw new Error("This contact does not exist");
  }
  return contact;
};

const removeContactService = async (id) => {
  const contacts = await listContactsService();
  const updatedContacts = contacts.filter((contact) => contact.id !== id);
  await fs.writeFile(contactPath, JSON.stringify(updatedContacts, null, 2));
};

const addContactService = async (newContact) => {
  const contacts = await listContactsService();

  const id = randomUUID();
  const contactWithId = { ...newContact, id };
  contacts.push(contactWithId);

  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

  return contactWithId;
};

const updateContactService = async (contactID, body) => {
  const contacts = await listContactsService();
  const contactIndex = contacts.findIndex((contact) => contact.id === contactID);
  if (contactIndex === -1) {
    throw new Error('This contact does not exist');
  }
  const updatedContact = { ...contacts[contactIndex], ...body };
  contacts[contactIndex] = updatedContact;
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
