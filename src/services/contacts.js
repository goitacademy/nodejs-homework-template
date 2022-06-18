const { contactsRepository } = require('./../repository')

class ContactServices {
  constructor() {
    this.repositories = { contacts: contactsRepository }
  }

  async getContacts(userId, query) {
    try {
      const {
        docs: contacts,
        totalDocs: total,
        limit,
        offset,
      } = await this.repositories.contacts.getContacts(userId, query)
      return { contacts, total, limit, offset }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async getContactById(userId, contactId) {
    try {
      const data = await this.repositories.contacts.getContactById(
        userId,
        contactId,
      )
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async removeContact(userId, contactId) {
    try {
      const data = await this.repositories.contacts.removeContact(
        userId,
        contactId,
      )
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async addContact(userId, body) {
    try {
      const data = await this.repositories.contacts.addContact(userId, body)
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateContact(userId, contactId, body) {
    try {
      const data = await this.repositories.contacts.updateContact(
        userId,
        contactId,
        body,
      )
      return data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async updateContactFavorite(userId, contactId, { favorite }) {
    try {
      const data = await this.repositories.contacts.updateContactFavorite(
        userId,
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