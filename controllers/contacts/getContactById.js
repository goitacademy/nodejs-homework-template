const { NotFound } = require('http-errors')
const contactsOperations = require('../../models/contacts')

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.getByIdContact(id)
    if (!result) {
      throw new NotFound(`Contact with id=${id} not found`)
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
