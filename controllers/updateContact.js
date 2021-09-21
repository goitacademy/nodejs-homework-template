const { NotFound } = require('http-errors')

const contactsOperations = require('../model')
const { sendSeccessRes } = require('../helpers')

const updateContact = async (req, res) => {
  const { contactId } = req.params
  const result = await contactsOperations.updateContact(contactId, req.body)

  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }

  sendSeccessRes(res, result, 200, 'Contact has been successfully updated')
}

module.exports = updateContact
