const { NotFound } = require('http-errors')
const { Contact } = require('../../model/contacts')
const sendSuccessRes = require('../../helpers/sendSuccessRes')

const updateStatusContact = async(req, res) => {
  const { id } = req.params
  const { favorite } = req.body
  if (!favorite) {
    throw new NotFound('missing field favorite')
  }
  const contact = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
  if (!contact) {
    throw new NotFound(`Contact with id=${id} not found`)
  }
  sendSuccessRes(res, { contact })
}

module.exports = updateStatusContact
