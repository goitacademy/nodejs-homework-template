const { BadRequest } = require('http-errors')
const { joySchema } = require('../../model/contact')
const {Contact} = require('../../model')

const updateContactByIdController = async (req, res, next) => {
  try {
     const { error } = joySchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    
    const {contactId}= req.params
    const newContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
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