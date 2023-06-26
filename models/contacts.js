const fs = require('fs/promises')
const path = require("path");
const contactPath = path.resolve(__dirname, "contacts.json");

const readContactsFile = async () => {
    try {
      const contacts = await fs.readFile(contactPath, "utf8");
      return JSON.parse(contacts);
    } catch (error) {
      console.log(error);
    }
  };

const listContacts = async () => {
    try {
      const parsedContacts = await readContactsFile();
      return parsedContacts;
    } catch (error) {
      console.log(error);
    }
  };

const getContactById = async (contactId) => {
    try {
      const parsedContacts = await readContactsFile();
      const contactById = parsedContacts.find(
        (contact) => contact.id === String(contactId)
      );
      return contactById || null;
    } catch (error) {
      console.log(error);
    }
  };

const addContact = async (name, email, phone) => {
    try {
      const parsedContacts = await readContactsFile();
      const id = nanoid();
      const newContact = { id, name, email, phone };
      parsedContacts.push(newContact);
      await fs.writeFile(contactPath, JSON.stringify(parsedContacts, null, 2));
      return newContact;
    } catch (error) {
      console.log(error);
    }
  };

const removeContact = async (contactId) => {
    try {
      const parsedContacts = await readContactsFile();
      const index = parsedContacts.findIndex( (contact) => contact.id === String(contactId))
      if(index === -1) return null;
      const [removedContact] = parsedContacts.splice(index, 1);
      const filteredContacts = parsedContacts.filter(
        (contact) => contact.id !== String(contactId)
      );
      await fs.writeFile(contactPath, JSON.stringify(filteredContacts, null, 2));
      return removedContact;
    } catch (error) {
      console.log(error);
    }
  };


const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
