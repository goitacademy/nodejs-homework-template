const { getContactById } = require('../../model/contacts')

const getContactByIdController = async (req, res) => {
  try {
    const contact = await getContactById(req.params.contactId)
    return res.status(200).json({ contact })
  } catch (err) {
    return res.status(404).json({ message: 'Not found by that id:' + req.params.contactId, error: err.message })
  }
}

module.exports = getContactByIdController
