/* const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contacts = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contacts);
    return JSON.parse(data);
  } catch (error) {
    return console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contacts);
    const dataParse = JSON.parse(data);
    return dataParse.find((data) => {
      if (data.id === contactId) {
        return data;
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
    if (contactsWithout.length !== dataParse.length) {
      fs.writeFile(contacts, JSON.stringify(contactsWithout));
      return true;
    } else {
      return false;
    }
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
      ...body,
    };

    dataParse.push(newContact);

    fs.writeFile(contacts, JSON.stringify(dataParse));
  } catch (error) {
    return console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile(contacts);
    const dataParse = JSON.parse(data);

    const index = dataParse.findIndex((data) => data.id === contactId);
    if (index !== -1) {
      dataParse[index] = {
        id: contactId,
        ...body,
      };
      fs.writeFile(contacts, JSON.stringify(dataParse));
      return dataParse[index];
    }
    return false;
  } catch (error) {
    return console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
 */