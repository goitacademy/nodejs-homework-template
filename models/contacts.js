const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((el) => el.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contactsList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((el) => el.id === contactId);
  const targetContact = contactsList[index];
  if (index === -1) {
    return null;
  } else {
    if (name) {
      targetContact.name = name;
    }
    if (email) {
      targetContact.email = email;
    }
    if (phone) {
      targetContact.phone = phone;
    }
  }
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return targetContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
