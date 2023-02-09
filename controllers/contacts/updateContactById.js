const contacts = require('../../models/contacts')

const RequestError = require('../../helpers/requestError')

const updateContactById = async (req, res) => {
  const { id } = req.params
  const result = await contacts.updateContactById(id, req.body)
  if (!result) {
    throw RequestError(404, 'Not Found')
  }
  res.status(201).json(result)
}

module.exports = updateContactById
