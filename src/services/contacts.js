const { ContactsReporitory } = require("../repository");

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsReporitory(),
    };
  }

  async listContacts(userId, query) {
    const data = await this.repositories.contacts.listContacts(userId, query);
    const { docs: contacts, totalDocs: total, limit, page } = data;
    return { contacts, total, limit, page };
  }

  async getContactById(userId, contactId) {
    const data = await this.repositories.contacts.getContactById(
      userId,
      contactId
    );
    return data;
  }

  async addContact(userId, body) {
    const data = await this.repositories.contacts.addContact(userId, body);
    return data;
  }

  async removeContact(userId, contactId) {
    const data = await this.repositories.contacts.removeContact(
      userId,
      contactId
    );
    return data;
  }

  async updateContact(userId, contactId, body) {
    const data = await this.repositories.contacts.updateContact(
      userId,
      contactId,
      body
    );
    return data;
  }

  async updateStatusContact(userId, contactId, body) {
    const data = await this.repositories.contacts.updateStatusContact(
      userId,
      contactId,
      body
    );
    return data;
  }
}

module.exports = { ContactsService };
