const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data.toString());
  return result;
};

const getById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => {
    return item.id === contactId;
  });

  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const result = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  console.log(body.name);

  if (!body.name || !body.email || !body.phone) {
    return null;
  }
  const result = { ...body, id: v4() };

  await fs.writeFile(
    contactsPath,
    JSON.stringify([...contacts, { ...body, id: v4() }])
  );

  return result;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => {
    return item.id === contactId;
  });
  const id = contacts[index].id;

  if (!body.name || !body.phone || !body.email) {
    return null;
  }

  const refreshContact = { ...body, id };
  contacts.splice(index, 1, refreshContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return refreshContact;
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
