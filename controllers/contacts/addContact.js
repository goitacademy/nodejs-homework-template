const { Contact } = require('../../model')

const addContact = async (req, res, next) => {
  try {
    const additionalContacts = await Contact.create(req.body)
    res.status(201).json({ additionalContacts })
  } catch (error) {
    next(error)
  }
}

module.exports = addContact
