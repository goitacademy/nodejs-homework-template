const { NotFound, BadRequest } = require('http-errors')
const joiSchema = require('../../midlewares/validation/addContactValidation')
const contactsOperations = require('../../models/index')

const update = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }

    const { contactId } = req.params
    const result = await contactsOperations.updateContact(contactId, req.body)

    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: 'missing fields'
    })
  }
}

module.exports = update
