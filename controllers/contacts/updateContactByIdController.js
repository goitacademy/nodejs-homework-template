const contactsOperations = require('../../model/contacts')
const { BadRequest } = require('http-errors')
const joySchema = require('../../middlewares/validation/contacts')

const updateContactByIdController = async (req, res, next) => {
  try {
     const { error } = joySchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    
    const {contactId}= req.params
    const newContact = await contactsOperations.updateContactById(contactId, req.body)
    if (!newContact) {
      throw new error("Not found")
    }
      res.status(201).json({
     status: 'success',
     code: 201,
     data: {
       newContact
     }
   })
  } catch (error) {
    next(error)
    
  }
}

module.exports = updateContactByIdController