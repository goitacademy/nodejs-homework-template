const { Contact } = require('../../model')

const add = async (req, res, next) => {
  try {
    // const { error } = joiContactSchema.validate(req.body)
    // if (error) {
    //   return res.status(400).json({
    //     message: error.message
    //   })
    // }
    const newContact = await Contact.create(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result: newContact
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
