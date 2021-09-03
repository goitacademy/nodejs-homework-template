<<<<<<< HEAD
const contactsOperations = require('../model')
=======
const { Contact } = require('../model')
>>>>>>> origin/hw-03-mongodb

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
<<<<<<< HEAD
    const contact = await contactsOperations.getContactById(contactId)

    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.json({ contact })
=======

    const contacts = await Contact.findById(contactId)

    if (!contacts) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.json({ contacts })
>>>>>>> origin/hw-03-mongodb
  } catch (error) {
    next(error)
  }
}

module.exports = getContactById
