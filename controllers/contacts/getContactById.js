const { Contact } = require('../../models/contact')

const RequestError = require('../../helpers/requestError')

const getContactById = async (req, res) => {
  const { id } = req.params

  const result = await Contact.findById(id)
  if (!result) {
    throw RequestError(404, 'Not Found')
  }
  res.json(result)
}
module.exports = getContactById
