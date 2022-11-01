const fs = require("fs/promises");
const path = require("path");
const uniqID = () => Math.random().toString(36).slice(2);

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) => id === contactId);
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const changedCollection = contacts.filter(({ id }) => id !== contactId);
    await updateFile(changedCollection);
    return contacts.find(({ id }) => id === contactId);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = {
      id: uniqID(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const contacts = await listContacts();
    const changedCollection = [...contacts, newContact];
    await updateFile(changedCollection);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactToChange = contacts.find(({ id }) => id === contactId);
    const newPropsOfContact = {
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const changedContact = { ...contactToChange, ...newPropsOfContact };
    const changedCollection = contacts.map((item) => {
      if (item.id === contactId) {
        return (item = changedContact);
      }
      return item;
    });
    await updateFile(changedCollection);
    return contactToChange ? changedContact : contactToChange;
  } catch (error) {
    console.log(error);
  }
};

const updateFile = async (instance) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
