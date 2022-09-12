// const addContact = async (body) => {}

const fs = require("fs").promises;
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContactsFile = async (writtenData) => {
  await fs.writeFile(contactsPath, JSON.stringify(writtenData));
};


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const parseData = JSON.parse(data);
  return parseData;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const selectedContact = data.find((el) => el.id === contactId);
  return selectedContact;
};


const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const contactToAdd = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(contactToAdd);
  await updateContactsFile(data);
  return contactToAdd;
};


const removeContact = async (contactId) => {
  const data = await listContacts();
  const deletedContacts = data.find((el) => el.id === contactId);
  const updatedContacts = data.filter((el) => el.id !== contactId);
  await updateContactsFile(updatedContacts);

  return deletedContacts;
};


const updateContact = async (contactId, { name, email, phone }) => {
  const data = await listContacts();

const newContact = {
  id: `${contactId}`,
  name,
  email,
  phone,
};

  const updateContact = data.find((el) => el.id === contactId);
  const updateContactId = data.indexOf(updateContact);
  if (updateContactId === -1) {
    return null;
  } else {
    data.splice(updateContactId, 1, newContact);
    await updateContactsFile(data);
  }
  return newContact;
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
