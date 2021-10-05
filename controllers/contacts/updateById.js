const { NotFound } = require('http-errors')
const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
  if (!result) {
    throw new NotFound(`Product with id = ${contactId} not found`)
  }
  sendSuccessRes(res, { data: result })
}

module.exports = updateById
