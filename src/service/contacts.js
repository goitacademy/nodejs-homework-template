const { ContactsRepository } = require("../repository");

class ContactsService {
  constructor() {
    this.repositories = { contacts: new ContactsRepository() };
  }

  async getAll(userId, query) {
    const data = await this.repositories.contacts.getAll(userId, query);
    //для каждого сервиса можно отдавать разные данные поэтому формат ответа формируем тут
    const { docs: contacts, totalDocs: total, limit, page } = data;

    return { contacts, total, limit, page };
  }

  async getById(userId, { contactId }) {
    const data = await this.repositories.contacts.getById(userId, contactId);
    return data;
  }

  async create(userId, body) {
    const data = await this.repositories.contacts.create(userId, body);
    return data;
  }

  async update(userId, { contactId }, body) {
    const data = await this.repositories.contacts.update(
      userId,
      contactId,
      body
    );
    return data;
  }

  async remove(userId, { contactId }) {
    const data = await this.repositories.contacts.remove(userId, contactId);
    return data;
  }
}

module.exports = ContactsService;
