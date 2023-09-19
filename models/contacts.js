const fs = require("fs").promises;
const contactsPath = "./models/contacts.json";
const { nanoid } = require("nanoid");

const updateContacts = async (data) => {
  const contacts = JSON.stringify(data);
  await fs.writeFile(contactsPath, contacts);
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const dataArray = JSON.parse(data.toString());
  const foundContact = dataArray.find((element) => element.id === contactId);
  return foundContact;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const dataArray = JSON.parse(data.toString());
  const index = dataArray.findIndex((element) => element.id === contactId);
  if (index === -1) {
    return;
  }
  const [contact] = dataArray.splice(index, 1);
  await updateContacts(dataArray);
  return contact;
};

const addContact = async (name, email, phone) => {
  const data = await fs.readFile(contactsPath);
  const dataArray = JSON.parse(data.toString());
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  dataArray.push(newContact);
  await updateContacts(dataArray);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await fs.readFile(contactsPath);
  const dataArray = JSON.parse(data.toString());
  const contact = dataArray.find((el) => el.id === contactId);
  if (!contact) {
    return;
  }
  contact.name = name;
  contact.email = email;
  contact.phone = phone;
  await updateContacts(dataArray);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
