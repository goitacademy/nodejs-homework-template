const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

class ContactList {
  constructor(path) {
    this.path = path;
  }

  async #getContactData(contactId) {
    const allContacts = await this.listContacts();
    const idx = allContacts.findIndex(contact => contact.id === contactId);

    return { contact: allContacts[idx], idx, allContacts };
  }

  async #createList(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
    return data;
  }

  async listContacts() {
    const data = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(data);
  }

  async getContactById(contactId) {
    const { contact } = await this.#getContactData(contactId);

    return contact;
  }

  async removeContact(contactId) {
    const { contact, idx, allContacts } = await this.#getContactData(contactId);

    if (!contact) {
      return null;
    }

    allContacts.splice(idx, 1);
    await this.#createList(allContacts);

    return contact;
  }

  async addContact(body = {}) {
    const allContacts = await this.listContacts();
    body.id = nanoid();
    allContacts.push(body);
    this.#createList(allContacts);

    return body;
  }

  async updateContact(contactId, body = {}) {
    const {
      contact: oldContact,
      idx,
      allContacts,
    } = await this.#getContactData(contactId);

    if (!oldContact) {
      return null;
    }

    const newContact = {
      ...oldContact,
      ...body,
    };

    allContacts[idx] = newContact;
    await this.#createList(allContacts);

    return newContact;
  }
}

const contactList = new ContactList(contactsPath);

module.exports = contactList;
