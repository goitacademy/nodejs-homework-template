const { BadRequest } = require('http-error')
const { joiSchema } = require('../../model/contact')
const { Contact } = require('../../model/index')

const createContact = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      error.status = 400
      throw new BadRequest(error.message)
    }
    const { _id } = req.user

    const newContact = await Contact.create({ ...req.body, owner: _id })
    res.status(201).json(newContact)
  } catch (error) {
    if (
      error.message.includes('validation failed') ||
      error.message.includes('length must be at least')
    ) {
      error.status = 400
    }

    next(error)
  }
}
module.exports = {
  createContact,
}
