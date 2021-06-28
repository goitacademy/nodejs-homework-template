const { jsonReader } = require('../utils')
const { addContact } = jsonReader
const { postSchema } = require('./validationSchema')

const add = async (req, res, next) => {
  const newContact = req.body
  const { error } = postSchema.validate(newContact)
  if (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      result: 'Bad request'
    })
  }
  try {
    const addedContact = await addContact(newContact)
    res.json({
      status: 'Success',
      code: 201,
      data: {
        result: addedContact
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = add
