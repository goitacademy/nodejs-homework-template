const { Contact } = require('../../model')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await Contact.findById(contactId)

    if (!contact) {
      return res.status(404).json({
        message: 'Not found'
      })
    }

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result: contact,
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
