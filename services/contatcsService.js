const { ContactRepository } = require('../repository/repository')

class ContactService {
  constructor() {
    this.repository = new ContactRepository()
  }

  listContacts() {
    const data = this.repository.listContacts()
    return data
  }

  getById({ contactId }) {
    return {}
  }

  addContact({ name, email, phone }) {
    return {}
  }

  removeContact({ contactId }) {
    return {}
  }

  updateContact({ contactId }, body) {
    return {}
  }
}

module.exports = { ContactService }
