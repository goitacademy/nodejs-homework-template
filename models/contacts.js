const fs = require("fs").promises;
const contactsPath = "./models/contacts.json";
const { nanoid } = require("nanoid");

const updateContacts = async (data) => {
  try {
    const contacts = JSON.stringify(data);
    await fs.writeFile(contactsPath, contacts);
  } catch (error) {
    console.error(err);
  }
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
  try {
    const data = await fs.readFile(contactsPath);
    const dataArray = JSON.parse(data.toString());
    const foundContact = dataArray.find((element) => element.id === contactId);
    return foundContact;
  } catch (error) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const dataArray = JSON.parse(data.toString());
    const index = dataArray.findIndex((element) => element.id === contactId);
    if (index === -1) {
      return;
    }
    const [contact] = dataArray.splice(index, 1);
    await updateContacts(dataArray);
    return contact;
  } catch (error) {
    console.error(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
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
  } catch (error) {
    console.error(err);
  }
};

const updateContact = async (contactId, { name, email, phone }) => {
  try {
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
  } catch (error) {
    console.error(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
