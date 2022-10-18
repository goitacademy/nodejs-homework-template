const contacts = require('../../models/contacts')
const RequestError = require('../../helpers/RequestError')
const Schema = require('../../schemas/contacts')


const putById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = Schema.validate(req.body)
    if (error) {
      throw RequestError(`missing required ${error.message}field`, 400)
    }

    const result = await contacts.updateContact(contactId, req.body)
    if (!result) {
      throw RequestError('Not found', 404)
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
}

module.exports = putById