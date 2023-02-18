const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(
  __dirname,
  "./contacts.json"
);
const { nanoid } = require("nanoid");

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile(
      contactsPath,
      "utf-8"
    );
    const contacts = JSON.parse(readContacts);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (id) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (contact) => contact.id === id
    );
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === id
  );
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return contacts[index];
};

const removeContact = async (id) => {
  try {
    const contacts = await listContacts();
    const contactRemove = contacts.filter(
      (contact) => contact.id !== id
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contactRemove, null, 2)
    );
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
