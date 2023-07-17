const fs = require("fs").promises;

const { v4: uuidv4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

class Anunnak {
  constructor(contactsPath) {
    this.path = contactsPath;
  }

  async fileWrite(contacts) {
    await fs.writeFile(this.path, JSON.stringify(contacts, null, 2));
  }

  async listContacts() {
    const result = await fs.readFile(contactsPath);
    return JSON.parse(result);
  }

  async getContactById(contactId) {
    const id = String(contactId);
    const searchContacts = await this.listContacts();
    const contactById = searchContacts.find((contact) => contact.id === id);
    return contactById || null;
  }

  async removeContact(contactId) {
    const id = String(contactId);
    const arrayContacts = await this.listContacts();
    const index = arrayContacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    const deleteContact = arrayContacts.splice(index, 1);
    await this.fileWrite(arrayContacts);
    return deleteContact;
  }

  async addContact(body) {
    const contacts = await this.listContacts();
    const newContact = { id: uuidv4(), ...body };
    contacts.push(newContact);
    await this.fileWrite(contacts);
    return newContact;
  }

  async updateContact(contactId, body) {
    const id = String(contactId);
    const contacts = await this.listContacts();
    let result = null;
    const newContacts = contacts.map((contact) => {
      if (contact.id === id) {
        result = { ...contact, ...body };
        return result;
      } else {
        return contact;
      }
    });
    await this.fileWrite(newContacts);
    return result;
  }
}
const contacts = new Anunnak(contactsPath);
module.exports = {
  contacts,
};
