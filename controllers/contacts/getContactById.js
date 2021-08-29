const contactsOperations = require('../../model/contacts')

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contactsOperations.getContactById(contactId)

    if (!contact) {
      return res.status(404).json({
        message: 'Not found',
      })
    }

    res.json({ contact })
  } catch (error) {
    next(error)
  }
}

module.exports = getContactById
