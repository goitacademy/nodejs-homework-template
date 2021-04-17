const { ContactsRepository } = require("../repository");

class ContactsService {
  constructor() {
    this.repositories = { contacts: new ContactsRepository() };
  }

  getAll() {
    const data = this.repositories.contacts.getAll();
    return data;
  }

  getById({ contactId }) {
    const data = this.repositories.contacts.getById(contactId);
    return data;
  }

  create(body) {
    const data = this.repositories.contacts.create(body);
    return data;
  }

  update({ contactId }, body) {
    const data = this.repositories.contacts.update(contactId, body);
    return data;
  }

  remove({ contactId }) {
    const data = this.repositories.contacts.remove(contactId);
    return data;
  }
}

module.exports = ContactsService;
