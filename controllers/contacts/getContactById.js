const { NotFound } = require('http-errors')
const { Contact } = require('../../model/contacts')
const sendSuccessRes = require('../../helpers/sendSuccessRes')

const getContactById = async(req, res) => {
  const { id } = req.params
  const contact = await Contact.findById(id)
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { contact })
}

module.exports = getContactById
