const contactsOperations = require('../../model')
const { contactSchema } = require('../../schemas')

const createContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body)
    if (error) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: error.message,
      })
      return
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: 'sucess',
      code: 201,
      message: `✔️ Contact '${req.body.name}' added`,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error)
  }
}
module.exports = createContact
