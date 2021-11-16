const { listContacts } = require('../../model/contacts')

const listContactsController = async (req, res) => {
  const {_id} = req.user
  try {
    const contacts = await listContacts(_id)
    res.status(200).json({ contacts })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = listContactsController
