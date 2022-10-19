const {Contact, schemas} = require('../../models/contact')
const { RequestError } = require('../../helpers')


const putById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw RequestError(`missing required ${error.message}field`, 400)
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
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