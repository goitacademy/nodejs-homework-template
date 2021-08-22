const data = require('../../model')
const { addContactSchema } = require('../../validation')

const add = async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }
    const newContact = await data.addContact(req.body)
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
