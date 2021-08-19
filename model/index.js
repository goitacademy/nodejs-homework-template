const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(path.join(__dirname, "contacts.json"), "utf8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [contactById] = contacts.filter((contact) => contact.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const removeContact = contacts.splice(index, 1);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts)
    );
    return removeContact;
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const id = uuid();
  const newContact = {
    id,
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts)
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const [updatableContact] = contacts.filter(
    (contact) => contact.id === contactId
  );
  if (updatableContact) {
    Object.assign(updatableContact, body);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts)
    );
  }
  return updatableContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
