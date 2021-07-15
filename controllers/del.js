const { Contact } = require('../service')

const removeContact = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const result = await Contact.findByIdAndDelete(contactId)
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = removeContact
