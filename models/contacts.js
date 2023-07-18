const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { isContactUnique } = require("./../helpers/index");

const contactPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data);
  return contacts || null;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());

  return contacts.find((item) => item.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (!~contactIndex) {
    return null;
  }
  const removedItem = contacts.splice(contactIndex, 1)[0];
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return removedItem;
};

const addContact = async ({ name, email, phone }) => {
  // console.log({ name, email, phone });
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());

  if (!isContactUnique(contacts, name, email, phone)) {
    return "contact already exists";
  }

  // TODO: Check if contact exists

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const updatedContacts = [...contacts, newContact];
  await fs.writeFile(contactPath, JSON.stringify(updatedContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());

  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (!~contactIndex) {
    return null;
  }
  if (
    !isContactUnique(contacts, body.name, body.email, body.phone, contactIndex)
  ) {
    console.log(body);
    console.log(isContactUnique(contacts, body.name, body.email, body.phone));
    console.log(contacts);
    return "contact already exists";
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...body };

  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
