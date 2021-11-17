const { BadRequest } = require('http-errors')
const joiSchema = require('../../midlewares/validation/addContactValidation')
const contactsOperations = require('../../models/index')

const post = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }

    const result = await contactsOperations.addContact(req.body)

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = post
