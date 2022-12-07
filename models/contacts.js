const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateFile = async (instance) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(instance, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

const listContacts = async () => {
  try {
    const readFile = await fs.readFile(contactsPath);
    const items = JSON.parse(readFile);
    return items;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const getIdContact = contacts.find((contact) => contact.id === contactId);
    return getIdContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const removeContact = contacts.filter(
      (contact) => contact.id !== contactId
    );
    return removeContact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const newContact = {
      id: shortid.generate(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const contacts = await listContacts();
    const changedCollection = [...contacts, newContact];
    await updateFile(changedCollection);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const getIdContact = contacts.find((contact) => contact.id === contactId);
    const updateContact = {
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const changeContact = { ...getIdContact, ...updateContact };
    const changedCollection = contacts.map((item) => {
      if (item.id === contactId) {
        return (item = changeContact);
      }
      return item;
    });
    await updateFile(changedCollection);
    return getIdContact ? changeContact : getIdContact;
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
