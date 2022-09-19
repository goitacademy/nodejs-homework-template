const fs = require("fs/promises");
const path = require("path");
const uid = require("uid2");

// find the relative path to the database file

const contacts = path.normalize("./models/contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await fs.readFile(contacts, "utf-8");
    const parsedContactsList = JSON.parse(contactsList);

    if (parsedContactsList.length >= 1) return parsedContactsList;
    throw new Error("Contacts list is empty");
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactList = await listContacts();
    const [targetedContact] = contactList.filter(
      (contact) => contact.id === contactId.toString()
    );
    return targetedContact;
  } catch (err) {
    console.error(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const list = await listContacts();
    fs.writeFile(
      contacts,
      JSON.stringify(
        list.filter((contact) => contact.id !== contactId.toString())
      )
    );
    return listContacts();
  } catch (err) {
    console.error(err);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const newContact = {
      id: uid(6),
      name,
      email,
      phone,
    };
    const previousList = await listContacts();
    const newList = JSON.stringify([...previousList, newContact]);
    await fs.writeFile(contacts, newList);
    return newContact;
  } catch (err) {
    console.error(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const list = await listContacts();
    const [targetedContact] = list.filter(
      (contact) => contact.id === contactId
    );
    const incomingUpdatesEntries = Object.entries(body);
    const targetedContactKeys = Object.keys(targetedContact);

    const updatedEl = {
      ...targetedContact,
    };

    incomingUpdatesEntries.forEach((el) => {
      if (targetedContactKeys.includes(el[0])) {
        updatedEl[`${el[0]}`] = el[1];
      }
    });
    const newList = JSON.stringify([...list, updatedEl]);
    fs.writeFile(contacts, JSON.stringify(newList));
    return updatedEl;
  } catch (err) {
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
