const { NotFound } = require('http-errors')

const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getContactsById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findById(id)
  if (!result) {
    throw new NotFound(`Product with id=${id} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = getContactsById
