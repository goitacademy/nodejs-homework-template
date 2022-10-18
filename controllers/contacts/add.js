const Contact = require('../../models/contact')
const RequestError = require('../../helpers/RequestError')
const Schema = require('../../schemas/contacts')


const add = async (req, res, next) => {
  try {
    const { error } = Schema.validate(req.body)
    if (error) {
      throw RequestError(`missing required ${error.message}field`, 400)
    }

    const result = await Contact.create(req.body)
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
}

module.exports = add