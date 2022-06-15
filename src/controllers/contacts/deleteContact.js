const {
  getById,
  removeContact
} = require('../../../models/contacts')

const deleteContact = async (req, res) => {
  const { contactId } = req.params
  const isExistContact = await getById(contactId)

    if (!isExistContact) {
      return res.status(404).json({ message: 'Not found', status: 'failure' })
    }
    else {
      await removeContact(contactId)
      return res.status(200).json({ message: 'contact deleted', status: 'success' }) 
    }
}

module.exports = {
  deleteContact
}
