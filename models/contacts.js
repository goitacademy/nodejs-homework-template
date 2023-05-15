const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const contacts = require("./contacts.json");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const contact = contacts.find((object) => object.id === contactId);
  return contact;
};

const addContact = async (body) => {
  contacts.push({ ...body, id: uuidv4() });
  const dataToAdd = JSON.stringify(contacts);
  const dataToAddString = `${dataToAdd}`;
  await fs.writeFile(contactsPath, dataToAddString);
  return body;
};

const removeContact = async (contactId) => {
  const isContactFound = contacts.findIndex(
    (object) => object.id === contactId
  );
  contacts.splice(isContactFound, 1);
  const dataToAdd = JSON.stringify(contacts);
  const dataToAddString = `${dataToAdd}`;
  await fs.writeFile(contactsPath, dataToAddString);
  return isContactFound;
};

const updateContact = async (contactId, body) => {
  const contactToUpdate = contacts.find((object) => object.id === contactId);
  for (const key in body) {
    contactToUpdate[key] = body[key];
  }
  await removeContact(contactId);
  contacts.push(contactToUpdate);

  const dataToAdd = JSON.stringify(contacts);
  const dataToAddString = `${dataToAdd}`;
  await fs.writeFile(contactsPath, dataToAddString);

  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
