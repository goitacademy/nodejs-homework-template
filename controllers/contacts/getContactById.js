const { Contact } = require('../../models/contact')
const { NotFound } = require('http-errors')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, '_id, name , email , phone , owner')
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  })
}

module.exports = getContactById
