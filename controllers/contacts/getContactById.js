const { NotFound } = require('http-errors')

const contactOperations = require('../../model/contacts')
const { sendSuccessRes } = require('../../helpers')

const getContactsById = async (req, res) => {
  const { id } = req.params
  const result = await contactOperations.getContactById(id)
  if (!result) {
    throw new NotFound(`Product with id=${id} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = getContactsById
