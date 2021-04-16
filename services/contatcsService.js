const { ContactRepository } = require('../repository/repository')

class ContactService {
  constructor() {
    this.repository = new ContactRepository()
    
    
  }

  async listContacts(query, ownerID) {
    const data = await this.repository.listContacts(query, ownerID)
    return data
  }

  async getById({ contactId }, ownerID) {
    const data = await this.repository.getById(contactId, ownerID)
    return data
  }

  async addContact({ name, email, phone }, userID) {
    const data = await this.repository.addContact(name, email, phone, userID)
    return data
  }

  async removeContact({ contactId }, ownerID) {
    const data = await this.repository.removeContact(contactId, ownerID)
    return data
  }

  async updateContact({ contactId }, body, ownerID) {
    const data = await this.repository.updateContact(contactId, body, ownerID)
    return data
  }
  async updateStatusContact({ contactId }, body, ownerID) {
    const data = await this.repository.updateStatusContact(contactId, body, ownerID)
    return data
  }
}

module.exports = { ContactService }
