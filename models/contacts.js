const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');

 const contacts = path.join('models', 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contacts);
    return JSON.parse(data)
  } catch (error) {
    return console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contacts);
    const dataParse = JSON.parse(data);
    return dataParse.map((data) => {
      if (data.id === contactId) {
        return data
      }
    });
  } catch (error) {
    return console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contacts);
    const dataParse = JSON.parse(data);
    const contactsWithout = dataParse.filter(
      (contact) => contact.id !== contactId
    );

    fs.writeFile(contacts, JSON.stringify(contactsWithout));
    console.log(`Contact with id: ${contactId} was deleted.`);
    listContacts();
  } catch (error) {
    return console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contacts);

    const dataParse = JSON.parse(data);

    const newContact = {
      id: uuidv4(),
      name: name,
      email: email,
      phone: phone,
    };

    dataParse.push(newContact);

    fs.writeFile(contacts, JSON.stringify(dataParse));
    console.log(`Contact with id: ${newContact.id} was added.`);
    listContacts();
  } catch (error) {
    return console.log(error);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
