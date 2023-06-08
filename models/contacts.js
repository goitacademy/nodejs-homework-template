const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);
    return parseData;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);

    const contactMatch = parseData.find((contact) => contact.id === contactId);

    return contactMatch;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);

    const contactMatch = parseData.find((contact) => contact.id === contactId);

    const filtredContacts = parseData.filter(
      (contact) => contact.id !== contactMatch.id
    );

    const refreshedList = JSON.stringify(filtredContacts);

    await fs.writeFile(contactsPath, refreshedList);

    console.log(`Contact ${contactMatch.name} has been deleted successfully`);
    listContacts();
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      name: name,
      email: email,
      phone: phone,
      id: uuid(),
    };

    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);

    parseData.push(newContact);

    const refreshedList = JSON.stringify(parseData);

    await fs.writeFile(contactsPath, refreshedList);

    return newContact;
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (id, body) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);

    const index = parseData.findIndex((item) => item.id === id);

    if (index === -1) {
      return {
        status: 400,
        message: "missing fields",
      };
    }
    parseData[index] = { id, ...body };
    await fs.writeFile(contactsPath, JSON.stringify(parseData, null, 2));
    return parseData[index];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
