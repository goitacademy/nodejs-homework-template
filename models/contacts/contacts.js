const DB = require('../../db/db');
const db = new DB('contacts.json');
const { randomUUID } = require('crypto');

class Contacts {
  async listContacts() {
    return await db.read();
  }

  async getContactById(contactId) {
    const contacts = await db.read();
    const [contact] = contacts.filter(({ id }) => id === contactId);
    return contact;
  }

  async addContact(body) {
    const contacts = await db.read();
    const contact = { id: randomUUID(), ...body };
    contacts.push(contact);
    await db.write(contacts);
    return contact;
  }

  async removeContact(contactId) {
    const contacts = await db.read();
    const index = await contacts.findIndex(({ id }) => id === contactId);
    if (index >= 0) {
      const [contact] = contacts.splice(index, 1);
      await db.write(contacts);
      return contact;
    }
    return null;
  }

  async updateContact(body, contactId) {
    const contacts = await db.read();
    const index = await contacts.findIndex(({ id }) => id === contactId);
    if (index >= 0) {
      contacts[index] = { ...contacts[index], ...body };
      await db.write(contacts);
      return contacts[index];
    }
    return null;
  }
}

module.exports = Contacts;
