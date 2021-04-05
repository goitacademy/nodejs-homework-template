const { v4: uuidv4 } = require('uuid')
const db = require('../db/db')
class ContactRepository {
  async listContacts() {
    const data = await db.get('contacts').value()
    return data
  }

  async getById(contactId) {
    const data = await db.get('contacts').find(({ id }) => id === contactId).value()
    return data
  }

  async addContact(name, email, phone) {
    const id = uuidv4()
    const record = {
      id,
      name,
      email,
      phone
    }
    await db.get('contacts').push(record).write()
    return record
  }

  async removeContact(contactId) {
    const [record] = await db.get('contacts')
      .remove({ id: contactId })
      .write()
    return record
  }

  async updateContact(contactId, body) {
    const record = await db.get('contacts').find(({ id }) => id === contactId).assign(body).value()
    db.write()
    return record
  }
}

module.exports = { ContactRepository }
