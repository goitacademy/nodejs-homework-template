const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../model/index.js')

class PhoneContacts {
  getContacts(req, res) {
    const data = listContacts()
    if (!data) {
      return res.status(400).json({ message: 'Not found' })
    }
    return res.status(200).json(data)
  }

  findContactById(req, res) {
    const data = getContactById(req.params.contactId)
    if (!data) {
      return res.status(400).json({ message: 'Not found' })
    }
    return res.status(200).json(data)
  }

  postContact(req, res) {
    const data = addContact(req.body)
    return res.status(201).json(data)
  }

  deleteContact(req, res) {
    const data = removeContact(req.params.contactId)
    if (!data) {
      return res.status(400).json({ message: 'Not found' })
    }
    return res.status(200).json({ message: 'contact delete' })
  }

  patchContact(req, res) {
    const data = updateContact(req.params.contactId, req.body)
    if (!data) {
      return res.status(400).json({ message: 'Not found' })
    }
    return res.status(200).json(data)
  }
}
module.exports = new PhoneContacts()
