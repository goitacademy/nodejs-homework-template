const Contact = require('../../model/contact.model')
const ERROR_MESSAGES = require('../../const/const')

const getContact = async (req, res) => {
  try {
    const contactList = await Contact.find()
    res.status(200).json(contactList)
  } catch (error) {
    res.status(400).json({ message: ERROR_MESSAGES.NOT_FOUND })
  }
}

module.exports = getContact
