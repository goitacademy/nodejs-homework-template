const { Contact } = require('../service')

const updateContact = async (req, res, next) => {
  const { body } = req
  const { contactId } = req.params
  try {
    const result = await Contact.findByIdAndUpdate(contactId, body, { new: true },)
    if (!result) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found',
      })
    }
    res.json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = updateContact
