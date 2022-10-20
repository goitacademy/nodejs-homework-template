const { Contact } = require('../../models/contact')

const { RequestError } = require('../../helpers')

const updateContactsById = async (req, res, next) => {
  console.log(req.params)
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  console.log(result)
  if (!result) {
    throw RequestError(404, 'Not found')
  }
  res.status(201).json(result)
}
module.exports = updateContactsById
