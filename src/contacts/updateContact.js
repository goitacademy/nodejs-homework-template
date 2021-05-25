const Contact = require('../../model/contact.model')

const ERROR_MESSAGES = require('../../const/const')

const updateContact = (req, res) => {
  const contactId = req.params.contactId
  const newFields = req.body
  const { name, email, phone } = newFields

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: ERROR_MESSAGES.MISSING_FIELD,
    })
  }

  Contact.findOneAndUpdate(
    { _id: contactId },
    { $set: newFields },
    { new: true, useFindAndModify: false },
  )
    .then(foundContact => {
      if (!foundContact) {
        return res
          .status(404)
          .json({ message: ERROR_MESSAGES.NOT_FOUND })
      }

      res.json({ found_contact: foundContact })
    })
    .catch(error => res.status(400).json({ error: error }))
}

module.exports = updateContact
