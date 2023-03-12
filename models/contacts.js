const fs = require("fs").promises;
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsList = JSON.parse(contacts);
    // const contactsList = contacts.toString();

    return contactsList;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find((contact) => {
      return contact.id === contactId;
    });

    return contactById;

    // return contactById || `There are no contact with id ${contactId}`;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactQuery = await contacts.find((contact) => {
      return contact.id === contactId;
    });

    if (!contactQuery) {
      return `Can't remove,because there are no contact with id ${contactId}`
        .red;
    }
    const removeContactList = await contacts.filter((contact) => {
      return contact.id !== contactId;
    });

    fs.writeFile(contactsPath, JSON.stringify(removeContactList), "utf8");
    console.log(`=================================================`.green);
    console.log(`Contact with id ${contactId} removed successful`.green);
    console.log(`=================================================`.green);

    return removeContactList;
    // }
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: uuid(), ...body };
    contacts.push(newContact);

    fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);

    if (index === -1) {
      return null;
    }

    contacts[index] = { ...contacts[index], ...body };

    fs.writeFile(contactsPath, JSON.stringify(contacts), "utf8");

    return contacts[index];
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
