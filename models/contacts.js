const fs = require("fs").promises;
const { nanoid } = require("nanoid");

const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const updateContact = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((el) => el.id === contactId.toString());
    return result || null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((el) => el.id === contactId.toString());
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContact(contacts);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(10),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await updateContact(contacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateById = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await updateContact(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};