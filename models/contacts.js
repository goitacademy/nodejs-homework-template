const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

class ContactsOperations {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
  }
  listContacts = async () => {
    try {
      const data = await fs.readFile(this.pathToFile);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  };

  getContactById = async (contactId) => {
    try {
      const contacts = await this.listContacts();
      const result = contacts.find((item) => item.id === contactId);
      return result || null;
    } catch (error) {
      console.log(error);
    }
  };

  removeContact = async (contactId) => {
    try {
      const contacts = await this.listContacts();
      const index = contacts.findIndex((item) => item.id === contactId);
      if (index === -1) {
        return null;
      }
      const [result] = contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  addContact = async ({ name, email, phone }) => {
    try {
      const contacts = await this.listContacts();
      const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
      };
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return newContact;
    } catch (error) {
      console.log(error);
    }
  };

  updateContact = async (contactId, body) => {
    try {
      const contacts = await this.listContacts();
      const index = contacts.findIndex((item) => item.id === contactId);
      if (index === -1) {
        return null;
      }
      contacts[index] = { contactId, ...body };
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[index];
    } catch (error) {
      console.log(error);
    }
  };
}

const contacts = new ContactsOperations(contactsPath);

module.exports = contacts;
