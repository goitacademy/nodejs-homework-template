const { getById } = require('../../model/contacts/index')

const getContactById = async (req, res, next) => {
  const id = req.params.contactId
  const contact = await getById(id)
  if (!contact) {
    return res.status(404).json({ message: 'Not found' })
  }
  res.status(200).json({ contact, message: 'success' })
}

module.exports = { getContactById }
