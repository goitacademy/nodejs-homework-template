const { contactsRepository } = require('./../repository')

class ContactServices {
  constructor() {
    this.repositories = { contacts: contactsRepository }
  }

  async listContacts() {
    try {
      const data = await this.repositories.contacts.listContacts()
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getContactById(contactId) {
    try {
      const data = await this.repositories.contacts.getContactById(contactId)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async removeContact(contactId) {
    try {
      const data = await this.repositories.contacts.removeContact(contactId)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async addContact(body) {
    try {
      const data = await this.repositories.contacts.addContact(body)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateContact(contactId, body) {
    try {
      const data = await this.repositories.contacts.updateContact(
        contactId,
        body,
      )
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateStatusContact(contactId, { favorite }) {
    try {
      const data = await this.repositories.contacts.updateStatusContact(
        contactId,
        { favorite },
      )
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

module.exports = { ContactServices }