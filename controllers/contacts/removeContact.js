const { NotFound } = require('http-errors')
const { Contact } = require('../../model/contacts')

const sendSuccessRes = require('../../helpers/sendSuccessRes')

const removeContact = async(req, res, next) => {
  const { id } = req.params
  const contacts = await Contact.findByIdAndDelete(id)
  if (!contacts) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { message: 'Success delete' })
}

module.exports = removeContact
