const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const readContactsFile = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error occured when trying to read file:".red, error);
    throw error;
  }
};

const writeContactsFile = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error("Error occured when trying to update file:".red, error);
    throw error;
  }
};

const listContacts = async () => {
  try {
    const contacts = await readContactsFile();

    return contacts;
  } catch (error) {
    console.error("Error occured when trying to show contacts:".red, error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await readContactsFile();
    const searchedContact = contacts.find(
      (contact) => contact.id === contactId
    );

    return searchedContact;
  } catch (error) {
    console.error("Error occured when trying to get contact:".red, error);
  }
};

const removeContact = async (contactId) => {
  try {
    try {
      const contacts = await readContactsFile();
      const filteredContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );

      if (filteredContacts.length < contacts.length) {
        await writeContactsFile(filteredContacts);
      } else {
        console.log(`Contact with ID ${contactId} not found`.yellow);
      }
    } catch (error) {
      console.error("Error occured when removing contact:".red, error);
    }
  } catch (error) {}
};

const addContact = async (body) => {
  try {
    const contacts = await readContactsFile();
    const newContact = {
      id: uuidv4(),
      ...body,
    };
    contacts.push(newContact);
    await writeContactsFile(contacts);
    return newContact;
  } catch (error) {
    console.error("Error occured when adding contact:".red, error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await readContactsFile();
    const contactToUpdateIndex = contacts.findIndex(
      (contact) => contact.id === contactId
    );

    if (contactToUpdateIndex === -1) {
      console.log(`Contact with ID ${contactId} not found`.red);
      return null;
    }

    const updatedContact = {
      ...contacts[contactToUpdateIndex],
      ...body,
    };

    contacts[contactToUpdateIndex] = updatedContact;

    await writeContactsFile(contacts);
  } catch (error) {
    console.error("Error occurred when updating contact:".red, error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
