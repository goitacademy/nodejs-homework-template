const fs = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data.toString());
  } catch (error) {
    return error;
  }
};

const getContactById = async (id) => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(data.toString());
    const result = contacts.find((el) => el.id === id);

    if (!result) {
      console.log("Nothing was found !");
      return;
    }
    return result;
  } catch (error) {
    return error;
  }
};

const removeContact = async (id) => {
  try {
    const data = await fs.readFile(contactsPath);
    const result = await JSON.parse(data.toString());
    const newContacts = await result.filter((el) => el.id !== id);
    if (newContacts.length === result.length) {
      console.log("this ID wasn't found !");
      return;
    }
    fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContacts;
  } catch (error) {
    return error;
  }
};

const addContact = async (name, phone, email) => {
  try {
    const data = await fs.readFile(contactsPath);
    let contacts = await JSON.parse(data.toString());
    const newContact = {
      id: uuid(),
      name,
      phone,
      email,
    };
    contacts.push(newContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (error) {
    return error;
  }
};

const updateContact = async (contactId, contact) => {
  try {
    const data = await fs.readFile(contactsPath);
    let contacts = await JSON.parse(data.toString());
    const { name, phone, email } = contact;
    const updateContact = {
      id: contactId,
      name: name,
      email: email,
      phone: phone,
    };

    const contactToUpdate = contacts.find((el) => el.id === contactId);
    console.log(contacts.indexOf(contactToUpdate));
    contacts.splice(contacts.indexOf(contactToUpdate), 1, updateContact);
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
  } catch (error) {
    return error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
