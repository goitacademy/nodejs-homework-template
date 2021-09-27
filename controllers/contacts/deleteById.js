// const createError = require("http-errors")
const { NotFound, InternalServerError } = require('http-errors')

const contacstOperations = require('../../model/contacts')

const deleteById = async (req, res, next) => {
  const { contactId } = req.params

  const result = await contacstOperations.removeContact(contactId)

  if (result === undefined) throw new NotFound(`Can't find contact with id ${contactId}`)

  if (!result) throw new InternalServerError('File input / output error')

  res.status(200).json({
    status: 'Contact deleted',
    code: 200
  })
}

module.exports = {
  deleteById
}
