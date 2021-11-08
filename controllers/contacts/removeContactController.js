const { removeContact } = require('../../model/contacts')

const { readFile } = require('../../js')
const contactsPath = require('./supportData')

const removeContactController = async (req, res) => {
  try {
    const contacts = await readFile(contactsPath)
    const contactToDelete = contacts.find(
      (el) => Number(el.id) === Number(req.params.contactId)
    )
    if (contactToDelete) {
      await removeContact(req.params.contactId)
      return res.status(200).json({ message: 'contact deleted' })
    }
    return res.status(404).json({ message: 'Not found' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = removeContactController
