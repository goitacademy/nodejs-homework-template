const { NotFound } = require('http-errors')

const contactOperations = require('../../model/contacts')
const { sendSuccessRes } = require('../../helpers')

const removeContact = async (req, res) => {
  const { id } = req.params
  const result = await contactOperations.removeContact(id)
  if (!result) {
    throw new NotFound(`Product with id=${id} not found`)
  }
  sendSuccessRes(res, { message: 'Success delete' })
}

module.exports = removeContact
