const { v4: uuidv4 } = require('uuid')
const db = require('../db/db')
class ContactRepository {
  listContacts() {
    return db.get('contacts').value()
  }

  getById(contactId) {
    return db.get('contacts').find(({ id }) => id === contactId).value()
  }

  addContact(name, email, phone) {
    const id = uuidv4()
    const record = {
      id,
      name,
      email,
      phone
    }
    db.get('contacts').push(record).write()
    return record
  }

  removeContact(contactId) {
    const [record] = db.get('contacts')
      .remove({ id: contactId })
      .write()
    return record
  }

  updateContact(contactId, body) {
    const record = db.get('contacts').find(({ id }) => id === contactId).assign(body).value()
    db.write()
    return record
  }
}

module.exports = { ContactRepository }
