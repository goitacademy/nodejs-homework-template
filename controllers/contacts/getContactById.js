const contacts = require('../../models/contacts')

const RequestError = require('../../helpers/requestError')

const getContactById = async (req, res) => {
  const { id } = req.params
  const result = await contacts.getContactById(id)
  if (!result) {
    throw RequestError(404, 'Not Found')
  }
  res.json(result)
}
module.exports = getContactById
