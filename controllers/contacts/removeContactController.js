const {
  removeContact
} = require('../../model/contacts')

const removeContactController = async (req, res) => {
  try {
    const deletedContact = await removeContact(req.params.contactId)
    if (!deletedContact) {
      return res.status(404).json({
        message: 'Not found with that id:' + req.params.contactId
      })
    }
    return res.status(200).json({
      message: 'contact deleted'
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

module.exports = removeContactController
