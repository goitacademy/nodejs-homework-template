const { NotFound } = require('http-errors')
const contactsOperations = require('../../models/index')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params

    const result = await contactsOperations.getContactById(contactId)
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }

    res.json({
      stasus: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getById
