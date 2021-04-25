const { ContactsRepository } = require("../repository");

class ContactsService {
  constructor() {
    this.repositories = { contacts: new ContactsRepository() };
  }

  async getAll() {
    const data = await this.repositories.contacts.getAll();
    return data;
  }

  async getById({ contactId }) {
    const data = await this.repositories.contacts.getById(contactId);
    return data;
  }

  async create(body) {
    const data = await this.repositories.contacts.create(body);
    return data;
  }

  async update({ contactId }, body) {
    const data = await this.repositories.contacts.update(contactId, body);
    return data;
  }

  async remove({ contactId }) {
    const data = await this.repositories.contacts.remove(contactId);
    return data;
  }
}

module.exports = ContactsService;
