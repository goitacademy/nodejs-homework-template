const { ContactRepository } = require('../repository/repository')

class ContactService {
  constructor() {
    this.repository = new ContactRepository()
  }

  listContacts() {
    return this.repository.listContacts()
  }

  getById({ contactId }) {
    return this.repository.getById(contactId)
  }

  addContact({ name, email, phone }) {
    return this.repository.addContact(name, email, phone)
  }

  removeContact({ contactId }) {
    return this.repository.removeContact(contactId)
  }

  updateContact({ contactId }, body) {
    return this.repository.updateContact(contactId, body)
  }
}

module.exports = { ContactService }
