const { NotFound } = require('http-errors')
const contactsOperation = require('../../model/contacts')
const { sendSuccessRes } = require('../../helpers')

const updateById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperation.updateById(contactId, req.body)
  if (!result) {
    throw new NotFound(`Product with id = ${contactId} not found`)
  }
  sendSuccessRes(res, { data: result })
}

module.exports = updateById
