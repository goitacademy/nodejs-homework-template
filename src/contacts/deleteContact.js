const Contact = require('../../model/contact.model')
const ERROR_MESSAGES = require('../../const/const')

const deleteContact = (req, res) => {
  const contactId = req.params.contactId

  Contact.findOneAndDelete({ _id: contactId })
    .then(foundContact => {
      if (!foundContact) {
        return res
          .status(404)
          .json({ message: ERROR_MESSAGES.NOT_FOUND })
      }

      res.json({
        found_contact: foundContact,
        message: `Contact with ID=${contactId} deleted successfully!`,
      })
    })
    .catch(error => res.status(400).json({ error: error }))
}

module.exports = deleteContact
