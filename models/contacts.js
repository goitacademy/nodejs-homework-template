const fs = require('fs/promises');
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts= async (contacts)=> await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data);
  } catch (error) {
    error.message = "There are some problems with response";
    throw error;
  };
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const res = contacts.find(item => item.id === contactId);
    return res || null;
  } catch (error) {
    error.message = `Can't find contact with id ${contactId}`;
    throw error;
  };
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    };
    const [res] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return res;
  } catch (error) {
    error.message = "Can't remove contact";
    throw error;
  };
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    const newContactsArr = [...contacts, newContact];
    await updateContacts(newContactsArr);
    return newContact;
  } catch (error) {
    error.message = "Can't add contact";
    throw error;
  };
};

const updateContactById = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, name, email, phone }
  await updateContacts(contacts)
  return contacts[index]
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
