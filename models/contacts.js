const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.resolve("./models/contacts.json");

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}



const listContacts = async () => {
  return await contactsData();
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const searchedContact = data.find((elem) => elem.id === contactId);
  return searchedContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const deletedContact = data.filter((elem) => elem.id !== contactId);
  await writeContacts(deletedContact);
  return deletedContact;
};

const addContact = async (body) => {
  const data = await listContacts();
  const newContact = {
    id: shortid(),
    ...body,
  };
  data.push(newContact);
  await writeContacts(data);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  contacts.forEach((item) => {
    if (item.id === contactId) {
      item.name = name;
      item.email = email;
      item.phone = phone;
    }
  });
  await writeContacts(contacts);
  return body;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
