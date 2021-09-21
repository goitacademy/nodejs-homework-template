const { NotFound } = require('http-errors')

const contactsOperations = require('../model')
const { sendSeccessRes } = require('../helpers')

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.getContactById(contactId)

  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }

  sendSeccessRes(res, result)
}

module.exports = getContactById
