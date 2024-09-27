const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

class ContactsAction {
  constructor(pathToFile) {
    this.pathToFile = pathToFile;
  }

  async listContacts() {
    try {
      const data = await fs.readFile(contactsPath);
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getContactById(contactId) {
    try {
      const contacts = await this.listContacts();
      const result = contacts.find((contact) => contact.id === contactId);
      return result || null;
    } catch (error) {
      console.log(error);
    }
  }

  async removeContact(contactId) {
    try {
      const contacts = await this.listContacts();
      const index = contacts.findIndex((contact) => contact.id === contactId);
      if (index === -1) {
        return null;
      }
      const [result] = contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async addContact({ name, email, phone }) {
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
  }

  async updateContact(id, body) {
    try {
      const contacts = await this.listContacts();
      const index = contacts.findIndex((item) => item.id === id);
      if (index === -1) {
        return null;
      }
      contacts[index] = { id, ...body };
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[index];
    } catch (error) {
      console.log(error);
    }
  }
}

const contacts = new ContactsAction(contactsPath);
module.exports = contacts;
