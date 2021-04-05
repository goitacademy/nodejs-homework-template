const { ContactRepository } = require('../repository/repository')

class ContactService {
  constructor() {
    this.repository = new ContactRepository()
  }

  async listContacts() {
    const data = await this.repository.listContacts()
    return data
  }

  async getById({ contactId }) {
    const data = await this.repository.getById(contactId)
    return data
  }

  async addContact({ name, email, phone }) {
    const data = await this.repository.addContact(name, email, phone)
    return data
  }

  async removeContact({ contactId }) {
    const data = await this.repository.removeContact(contactId)
    return data
  }

  async updateContact({ contactId }, body) {
    const data = await this.repository.updateContact(contactId, body)
    return data
  }
}

module.exports = { ContactService }
