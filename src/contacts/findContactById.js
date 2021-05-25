const Contact = require('../../model/contact.model')
const ERROR_MESSAGES = require('../../const/const')

const findContactById = (req, res) => {
  const contactId = req.params.contactId

  Contact.findOne({ _id: contactId })
    .then(foundContact => {
      if (!foundContact) {
        return res.status(404).json({
          message: ERROR_MESSAGES.NOT_FOUND,
        })
      }

      res.status(200).json({ found_contact: foundContact })
    })
    .catch(error => res.status(400).json({ error: error }))
}

module.exports = findContactById
