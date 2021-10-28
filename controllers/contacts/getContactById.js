const { NotFound } = require('http-errors')
const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const getContactsById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findById(id, '_id name email phone favorite')
  if (!result) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = getContactsById
