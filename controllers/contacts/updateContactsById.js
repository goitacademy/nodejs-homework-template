const { NotFound } = require('http-errors')

const { Contact } = require('../../models')
const { sendSuccessRes } = require('../../helpers')

const updateContactsById = async (req, res) => {
  const { id } = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  if (!result) {
    throw new NotFound(`Product with id=${id} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = updateContactsById
