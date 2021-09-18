const { Contact } = require('../../model')

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contacts = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!contacts) {
      return res.status(404).json({ message: 'Not found required contact' })
    }
    res.status(200).json({ contacts })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
