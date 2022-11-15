const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, "utf8"));
};

const getContact = async (contactId) => {
  return (await listContacts()).find((el) => el.id === contactId);
};

const removeContact = async (contactId) => {
  await fs.writeFile(
    contactsPath,
    JSON.stringify((await listContacts()).filter((el) => el.id !== contactId))
  );
};

const addContact = async (body) => {
  const contacts = await listContacts();
  contacts.push({
    id: `${Number(contacts[contacts.length - 1].id) + 1}`,
    ...body,
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  for (const key in body) {
    if (body[key]) contact[key] = body[key];
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contact;
};

module.exports = {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
};
