const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "/contacts.json");

const writeNewData = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  const parsedData = JSON.parse(data);
  return parsedData;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find(({ id }) => id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const newData = data.filter(({ id }) => id !== contactId.toString());
  await writeNewData(newData);
};

const addContact = async (body) => {
  const data = await listContacts();
  data.push(body);
  await writeNewData(data);
  return body;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { id: contactId, ...body };
  await writeNewData(data);
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
