const { ContactsRepository } = require("../repository")

class ContactsService {
  constructor() {
    this.repositories = {
      contacts: new ContactsRepository(),
    }
  }
  async listContacts() {
    const data = await this.repositories.contacts.listContacts()
    return data
  }
  async getContactById(id) {
    const data = await this.repositories.contacts.getContactById(id)
    return data
  }
  async create(body) {
    const data = await this.repositories.contacts.create(body)
    return data
  }
  async removeContact(id) {
    const data = await this.repositories.contacts.removeContact(id)
    return data
  }
  async updateContact(id, body) {
    const data = await this.repositories.contacts.updateContact(id, body)
    return data
  }

  async updateStatusContact(id, body) {
    const data = await this.repositories.contacts.updateStatusContact(id, body)
    return data
  }
}

module.exports = new ContactsService()
