const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(`"Error reading file:", ${err.message}`);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = await contacts.find(({ id }) => id === contactId);
    return contactById;
  } catch (err) {
    console.log(
      `There is no contact with id ${contactId} in database, ${err.message}`
    );
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = await contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2),
      "utf8"
    );
    console.log(`Contact with the given id: ${contactId} has been deleted`);
    return updatedContacts;
  } catch (err) {
    console.log(
      `There is no contact with id ${contactId} in database, ${err.message}`
    );
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await listContacts();
    const newContact = { ...body, id: nanoid() };
    const updatedContacts = [...contactsList, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));

    return updatedContacts;
  } catch (err) {
    console.log(`Unable to add contact to database, ${err.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.map((contact) => {
      if (contact.id === contactId) {
        return { ...contact, ...body };
      }
      return contact;
    });

    const updatedContact = await updatedContacts.find(
      ({ id }) => id === contactId
    );

    if (!updatedContact) {
      return null;
    }

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
    return updatedContact;
  } catch (err) {
    console.log(`Error updating the contact with ID:${contactId}`, err.message);
    return false;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
