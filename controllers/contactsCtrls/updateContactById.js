const { NotFound, BadRequest } = require('http-error')
const { joiSchema } = require('../../model/contact')
const { Contact } = require('../../model/index')

const updateContactById = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { contactId } = req.params
    const updateContact = await Contact.findByIdAndUpdate(
      contactId,

      req.body,
      {
        new: true,
      }
    )

    if (!updateContact) {
      throw new NotFound()
    }
    res.json(updateContact)
  } catch (error) {
    if (
      error.message.includes('validation failed') ||
      error.message.includes('length must be at least')
    ) {
      //   throw new NotFound()
      error.status = 400
    }
    next(error)
  }
}
module.exports = {
  updateContactById,
}
