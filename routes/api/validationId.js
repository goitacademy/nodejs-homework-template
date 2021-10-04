const mongoose = require('mongoose')

const ObjectId = mongoose.Types.ObjectId

function isIdValid(req, res, next) {
  const {
    params: { contactId }
  } = req

  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Id is invalid'
    })
  }
  next()
}

module.exports = isIdValid
