const fs = require("fs/promises");
const path = require("path");

const { v4: uuid } = require("uuid");

const readData = async () => {
  const data = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf-8"
  );

  return JSON.parse(data);
};

const listContacts = async () => {
  return await readData();
};

const getContactById = async (contactId) => {
  const data = await readData();

  const result = data.find((contact) => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const data = await readData();

  const index = data.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const result = data.splice(index, 1);

    const content = JSON.stringify(data);
    await fs.writeFile(path.join(__dirname, "contacts.json"), content);
    return result;
  }
  return null;
};

const addContact = async (body) => {
  const id = uuid();
  const newContact = { id, ...body };

  const data = await readData();
  data.push(newContact);

  const content = JSON.stringify(data);
  await fs.writeFile(path.join(__dirname, "contacts.json"), content);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await readData();

  const result = data.find((contact) => contact.id === contactId);

  if (result) {
    Object.assign(result, body);

    const content = JSON.stringify(data);
    await fs.writeFile(path.join(__dirname, "contacts.json"), content);
  }

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
