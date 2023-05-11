const fs = require("fs/promises");
const path = require("path");
const dbPath = path.join(__dirname, "..", "db", "contacts.json");
const { nanoid } = require("nanoid");
const { HttpError } = require("../utils/HttpError");
const contactsSchema = require("../utils/validationSchemas/contactsSchema");

async function getContactsService() {
  const data = await fs.readFile(dbPath);
  return JSON.parse(data);
}

const getContactService = async (contactId) => {
  const contacts = await getContactsService();
  const contact = contacts.find((contact) => contact.id === contactId);

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  return contact;
};

const addContactService = async ({ name, email, phone }) => {
  const contacts = await getContactsService();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const { error } = contactsSchema.validate(newContact);
  const isAlreadyInContacts = contacts.some(
    (contact) => contact.name === newContact.name
  );

  if (error || isAlreadyInContacts) {
    const errorMessage = error?.details[0].message;
    throw new HttpError(400, errorMessage || "Is already in contacts");
  }

  const renewedContacts = [...contacts, newContact];
  await fs.writeFile(dbPath, JSON.stringify(renewedContacts, null, 2));
  return newContact;
};

const updateContactService = async (contactId, { name, email, phone }) => {
  const contacts = await getContactsService();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    throw new HttpError(404, "Not found");
  }

  contacts[index] = {
    id: contacts[index].id,
    name,
    email,
    phone,
  };

  const { error } = contactsSchema.validate(contacts[index]);

  if (error) {
    const errorMessage = error.details[0].message;
    throw new HttpError(400, errorMessage);
  }

  await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

const removeContactService = async (contactId) => {
  const contacts = await getContactsService();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    throw new HttpError(404, "Not found");
  }

  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(dbPath, JSON.stringify(contacts, null, 2));
  return removedContact;
};

module.exports = {
  getContactsService,
  getContactService,
  removeContactService,
  addContactService,
  updateContactService,
};
