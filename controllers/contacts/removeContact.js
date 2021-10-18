const { NotFound } = require('http-errors')

const sendSuccessRes = require('../../helpers/sendSuccessRes')
const contactsOperations = require('../../model/index')

const removeContact = async(req, res, next) => {
  const { id } = req.params
  const contacts = await contactsOperations.removeContact(id)
  if (!contacts) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { message: 'Success delete' })
}

module.exports = removeContact
