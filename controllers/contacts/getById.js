const {Contact} = require('../../models/contact')
const {RequestError} = require('../../helpers')

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId)
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
