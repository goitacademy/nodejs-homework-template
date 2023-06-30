const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const tempPath = path.join(__dirname, "contacts.json");
console.log(tempPath);

const listContacts = async () => {
  const contacts = await fs.readFile(tempPath, "utf8");

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);

  return findContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const findIndex = contacts.findIndex(item.id === contactId);
  if (findIndex === -1) {
    return null;
  }
  const result = contacts.splice(findIndex, 1);
  await fs.writeFile(tempPath, JSON.stringify(contacts));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(tempPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  };
const contact = contacts[index]
contacts[index] = {id: nanoid(), ...contact, ...body}
await fs.writeFile(tempPath, JSON.srtringify(contacts))

return contacts[index]
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
