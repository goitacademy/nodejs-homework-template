const { NotFound } = require('http-errors')

const contactOperations = require('../model/contacts')
const { sendSuccessRes } = require('../helpers')

const updateContactsById = async (req, res) => {
  const { id } = req.params
  const result = await contactOperations.updateContactsById(id, req.body)
  if (!result) {
    throw new NotFound(`Product with id=${id} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = updateContactsById
