
const contacts = require('../schemas/contactsSchema')

class ContactRepository {
  constructor() {
    this.model = contacts
  }
  async listContacts() {
    const data = await this.model.find()
    return data
  }

  async getById(contactId) {
    const data = await this.model.findOne({_id: contactId})
    return data
  }

  async addContact(name, email, phone) {    
    const record = {      
      name,
      email,
      phone
    }
    await this.model.create(record)
    return record
  }

  async removeContact(contactId) {
    const record = await this.model.findByIdAndRemove({ _id: contactId })
    return record
  }

  async updateContact(contactId, body) {
    const record = await this.model.findByIdAndUpdate({_id: contactId},{...body},{new: true})    
    return record
  }
  async updateStatusContact(contactId, body) {
    const record = await this.model.findByIdAndUpdate({_id: contactId},{...body},{new: true}) 
    return record
  }
}

module.exports = { ContactRepository }