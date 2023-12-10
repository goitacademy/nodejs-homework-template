const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const contactsDB = await fs.readFile(contactsPath);
    const contacts = JSON.parse(contactsDB);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();

    const contactByID = allContacts.find((contact) => contact.id === contactId);

    return contactByID;
  } catch (err) {
    console.log(err);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();

    const contactIndex = allContacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      const removedContact = allContacts.splice(contactIndex, 1)[0];

      await fs.writeFile(contactsPath, JSON.stringify(allContacts));
      return removedContact;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

const addContact = async (body) => {
  try {
    const allContacts = await listContacts();

    allContacts.push(body);

    return await fs.writeFile(contactsPath, JSON.stringify(allContacts));
  } catch (err) {
    console.log(err);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();

    const contactIndex = allContacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactIndex !== -1) {
      const existingContact = allContacts[contactIndex];

      const updatedContact = { ...existingContact, ...body };

      allContacts[contactIndex] = updatedContact;

      await fs.writeFile(
        "./models/contacts.json",
        JSON.stringify(allContacts, null, 2)
      );
      return getContactById(contactId);
    } else {
      return null;
    }
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
