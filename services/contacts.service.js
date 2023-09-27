const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const relativePath = "../data/contacts.json";
const contactsPath = path.join(__dirname, relativePath);

const listContacts = async () => {
  try {
    const jsondata = await fs.readFile(contactsPath);
    const parsedData = JSON.parse(jsondata);
    return parsedData;
  } catch (error) {
    console.error("Error. Could not read file", error.message);
    throw "Cannot read contacts";
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const searchedContact = contacts.find(
      (contact) => contactId === contact.id
    );
    console.log(searchedContact);
    return searchedContact;
  } catch {
    const message = "Cannot read contact with id " + contactId;
    console.error(message);
    throw message;
  }
};

const removeContact = async (contactId) => {
  try {
    console.log("delete test", contactId);
    const contacts = await listContacts();
    console.log("l", contacts.length);
    const removedContact = contacts.find((contact) => contact.id === contactId);
    const filteredList = contacts.filter((contact) => contact.id !== contactId);
    console.log("l2", filteredList.length);

    await fs.writeFile(contactsPath, JSON.stringify(filteredList));
    console.log("deleted contact:", removedContact);
    return filteredList;
  } catch (error) {
    console.error("Error. Could not write file", error.message);
    throw "Cannot delete with id " + contactId;
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };
    const updatedList = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedList));
    // throw "blad zapisu";
    console.log("added new contact:", newContact);
    return newContact;
  } catch (error) {
    console.error("Error. Could not write file", error.message);
    throw "Cannot add contact";
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const updatedContactList = contacts.map((el) => {
      if (el.id === contactId) {
        const updatedContact = {
          id: contactId,
          name: name,
          email: email,
          phone: phone,
        };
        return updatedContact;
      } else {
        return el;
      }
    });

    await fs.writeFile(contactsPath, JSON.stringify(updatedContactList));
    console.log("updated contact:", updatedContactList);
  } catch (error) {
    console.error("Error. Could not write file", error.message);
    throw "Cannot update contact with id " + contactId;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
