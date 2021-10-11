const { NotFound } = require('http-errors')
const { Contact } = require('../model')

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await Contact.findById(contactId)

    if (!result) {
      throw new NotFound(`Contact with id ${contactId} not found`)
    }

    res.json({
      status: 'success',
      code: 200,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getContactById
