const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile("./models/contacts.json");
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contactId) => contactId.id === id);
  return contactById;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const removeById = contacts.findIndex((contactId) => contactId.id === id);
  contacts.splice(removeById, 1);
  if (removeById === -1) {
    return null;
  }
  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const contact = { id: `${contacts.length + 2}`, ...body };
  contacts.push(contact);
  await fs.writeFile("./models/contacts.json", JSON.stringify(contacts));
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactToUpdate = contacts.find((contact) => contact.id === contactId);

  if (!contactToUpdate) {
    return null;
  }
  const otherContacts = contacts.filter((contact) => contact.id !== contactId);

  const updatedContact = {
    ...contactToUpdate,
    ...body,
  };

  const contactsToSave = [...otherContacts, updatedContact];
  await fs.writeFile(contactsPath, JSON.stringify(contactsToSave, null, 2), {
    encoding: "utf-8",
  });
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
