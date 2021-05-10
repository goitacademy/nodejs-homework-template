const fs = require("fs/promises");

const { v4: uuidv4 } = require("uuid");

const path = require("path");

const contactPath = path.join(__dirname, "./contacts.json");

// const contacts = require("./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data).find((contact) => String(contact.id) === contactId);
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data);
  const contactsFiltered = contacts.filter(
    (contact) => String(contact.id) === contactId
  );
  const [deletedContact] = contacts.filter(
    (contact) => String(contact.id) === contactId
  );

  fs.writeFile(contactPath, JSON.stringify(contactsFiltered, null, "\t"));
  return deletedContact !== [] ? deletedContact : null;
};

const addContact = async (body) => {
  const id = uuidv4();
  const record = {
    id,
    ...body,
  };
  const data = await fs.readFile(contactPath);
  const users = JSON.parse(data);
  users.push(record);
  fs.writeFile(contactPath, JSON.stringify(users, null, "\t"));

  return record;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactPath);

  const contacts = JSON.parse(data);

  const contact = contacts.find((contact) => String(contact.id) === contactId);

  const updatedContact = { ...contact, ...body };

  contacts.forEach((item, i) => {
    if (item.id === Number(contactId)) contacts[i] = updatedContact;
  });

  fs.writeFile(contactPath, JSON.stringify(contacts, null, "\t"));

  return updatedContact.id ? updatedContact : null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
