const contacts = require('../../models/contacts')
const RequestError = require('../../helpers/RequestError')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId)
    if (!result) {
      throw RequestError('Not found', 404)
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
}

module.exports = getById
