const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");

  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");
  const arr = JSON.parse(data);

  const [foundContact] = arr.filter((contact) => contact.id === contactId);

  return foundContact || null;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, "utf8");

  const arr = JSON.parse(data);

  const [deletedContact] = arr.filter((contact) => contact.id === contactId);

  if (deletedContact) {
    const index = data.indexOf(deletedContact);

    arr.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));

    return deletedContact.id;
  }
  return null;
};

const addContact = async (contact) => {
  const data = await fs.readFile(contactsPath, "utf8");

  if (contact.name && contact.email && contact.phone) {
    const newContact = { id: nanoid(5), ...contact };

    const arr = JSON.parse(data);

    const foundedContact = arr.find((item) => item.name === contact.name);

    if (foundedContact) {
      return "exist";
    }

    arr.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));

    return newContact;
  }
  return null;
};

const updateContact = async (contactId, body) => {
  console.log(contactId, body);

  const data = await fs.readFile(contactsPath, "utf8");

  const arr = JSON.parse(data);

  const [contactForUpdate] = arr.filter((contact) => contact.id === contactId);

  const index = arr.indexOf(contactForUpdate);

  if (index > 0) {
    const updatedContact = { ...contactForUpdate, ...body };

    arr[index] = { ...updatedContact };

    await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));

    return updatedContact;
  }
  if (index < 0) {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
