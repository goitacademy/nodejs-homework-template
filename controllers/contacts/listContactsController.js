const { listContacts } = require('../../model/contacts')

const listContactsController = async (req, res) => {
  try {
    const contacts = await listContacts()
    res.status(200).json({ contacts })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = listContactsController
