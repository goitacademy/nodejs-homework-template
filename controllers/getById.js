const { NotFound } = require('http-errors')
const { getContactById } = require('../model/contacts')

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)
  if (!contact) {
    throw new NotFound('Not found')
  }
  res.json({ status: 'success', code: 200, data: { contact } })
}

module.exports = getById
