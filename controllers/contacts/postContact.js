const asyncHandler = require('express-async-handler')
const operations = require('../../service/contacts')
const contasctsSchema = require('./shema')

const postContact = asyncHandler(async (req, res, next) => {
  const { error } = contasctsSchema.validate(req.body)

  if (error) {
    const missed = error.message
      .slice(0, error.message.indexOf(' '))
      .slice(0, -1)
      .slice(1)

    error.status = 400
    error.message = `missing required ${missed} field`
    throw error
  }
  const result = await operations.addContact(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  })
})

module.exports = postContact
