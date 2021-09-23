const contactsOperations = require('../../model')


const add = async (req, res, next) => {
  try { 
    const { error } = contactSchema.validate(req.body);
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
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}


module.exports = add