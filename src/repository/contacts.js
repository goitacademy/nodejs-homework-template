const Contact = require("../../model")

class ContactsRepository {
  constructor() {
    this.model = Contact
  }
  async listContacts() {
    const result = await this.model.find({})
    return result
  }
  async getContactById(id) {
    const result = await this.model.findOne({ _id: id })
    return result
  }
  async create(body) {
    const result = await this.model.create(body)
    return result
  }
  async removeContact(id) {
    const result = await this.model.findByIdAndRemove({ _id: id })
    return result
  }

  async updateContact(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    )

    return result
  }

  async updateStatusContact(id, body) {
    const result = await this.model.findByIdAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    )

    return result
  }
}

module.exports = ContactsRepository
