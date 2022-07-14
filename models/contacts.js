const fs = require("fs/promises");
const path = require("path");
const ObjectID = require("bson-objectid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contactsFile = await fs.readFile(contactsPath);
  const data = JSON.parse(contactsFile);
  return data;
};

const getContactById = async (contactId) => {
  const contactsFile = await fs.readFile(contactsPath);
  const data = JSON.parse(contactsFile);
  const dataById = data.find(({ id }) => contactId === id);

  return dataById;
};

const removeContact = async (contactId) => {
  const contactsFile = await fs.readFile(contactsPath);
  const data = JSON.parse(contactsFile);
  const deletedContact = data.find(({ id }) => contactId === id);

  if (deletedContact) {
    const filteredArray = data.filter(({ id }) => id !== contactId);

    const jsonData = JSON.stringify(filteredArray, null, 2);

    await fs.writeFile(contactsPath, jsonData);
    return deletedContact;
  } else return deletedContact;
};

const addContact = async (body) => {
  const contactsFile = await fs.readFile(contactsPath);
  const data = JSON.parse(contactsFile);
  const contactToAdd = { ...body, id: ObjectID() };
  const isContactInArray = data.find(
    ({ name, email }) => name === body.name || email === body.email
  );
  if (isContactInArray) return;
  data.push(contactToAdd);
  const jsonData = JSON.stringify(data, null, 2);
  await fs.writeFile(contactsPath, jsonData);
  return contactToAdd;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const requiredContact = contacts.findIndex(({ id }) => contactId === id);
  console.log(contactId);
  if (requiredContact === -1) return;
  contacts[requiredContact] = { ...body, id: contactId };
  const jsonData = JSON.stringify(contacts, null, 2);
  await fs.writeFile(contactsPath, jsonData);
  return contacts[requiredContact];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
