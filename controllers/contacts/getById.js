// const createError = require("http-errors")
const { NotFound, InternalServerError } = require('http-errors')

const contacstOperations = require('../../model/contacts')

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contactData = await contacstOperations.getContactById(contactId)

  if (contactData === undefined) throw new NotFound(`Can't find contact with id ${contactId}`)

  if (!contactData) throw new InternalServerError('File input / output error')

  res.status(200).json({
    status: 'Contact found',
    code: 200,
    data: {
      contactData
    }
  })
}

module.exports = {
  getById
}
