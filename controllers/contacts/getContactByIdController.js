const { getContactById } = require('../../model/contacts')

const getContactByIdController = async (req, res) => {
  try {
    const contact = await getContactById(req.params.contactId)

    if (contact) {
      return res.status(200).json({ contact })
    }
    return res.status(404).json({ message: 'Not found' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = getContactByIdController
