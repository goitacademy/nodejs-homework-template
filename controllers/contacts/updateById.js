// const createError = require("http-errors")
const { BadRequest, NotFound, InternalServerError } = require('http-errors')

const contacstOperations = require('../../model/contacts')

const updateById = async (req, res, next) => {
  const { contactId } = req.params

  if (!(req.body.name || req.body.email || req.body.phone)) throw new BadRequest('Missing fields to update')

  const contactData = await contacstOperations.updateContact(contactId, req.body)

  if (contactData === undefined) throw new NotFound(`Can't find contact with id ${contactId}`)
  if (!contactData) throw new InternalServerError('File input / output error')

  res.status(200).json({
    status: 'Contact updated',
    code: 200,
    data: {
      contactData
    }
  })
}

module.exports = {
  updateById
}
