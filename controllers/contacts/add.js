// const createError = require("http-errors")
const { InternalServerError } = require('http-errors')
const contacstOperations = require('../../model/contacts')

const add = async (req, res, next) => {
  const contactData = await contacstOperations.addContact(req.body)

  if (!contactData) throw new InternalServerError('File input / output error')

  res.status(201).json({
    status: 'Contact added',
    code: 201,
    data: {
      contactData
    }
  })
}

module.exports = {
  add
}
