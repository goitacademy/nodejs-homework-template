const path = require('node:path');
const fs = require('node:fs/promises');
const HttpError = require('../common/HttpError');

class ContactsRepository {
  contactsPath = path.resolve(__dirname, "..", "db", "contacts.json");
  
  async readDB() {
    const content = await fs.readFile(this.contactsPath);
    const data = JSON.parse(content.toString());
    return data;
  }
  
  async writeDB(contacts) {
    const content = JSON.stringify(contacts, null, 2);
    await fs.writeFile(this.contactsPath, content);
  }
  
  async findAll() {
    const db = await this.readDB();
    return db;
  }

  async findOneById(contactId) {
    const db = await this.readDB();
    const contact = db.find(({ id }) => id === contactId);
    return contact;
  }

  async create(contact) {
    const db = await this.readDB();
    db.push(contact);
    await this.writeDB(db);
    return contact;
  }

  async updateById(contactId, payload) {
    const contact = await this.findOneById(contactId);
    if (!contact) {
      throw new HttpError(404, "Not found!")
    }

    const db = await this.readDB();
    const contactIndex = db.findIndex(({ id }) => id === contactId);

    const updatedContact = {
      ...db[contactIndex],
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    db[contactIndex] = updatedContact;
    await this.writeDB(db);
    return updatedContact;
  }

  async deleteById(contactId) {
    const contact = await this.findOneById(contactId);
    if (!contact) {
      throw new HttpError(404, "Not found!")
    }

    const db = await this.readDB();
    const filteredContacts = db.filter(({ id }) => id !== contactId);
    await this.writeDB(filteredContacts);
    return contact;
  }
}

const contactRepository = new ContactsRepository();

module.exports = contactRepository;