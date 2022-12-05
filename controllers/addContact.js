const { addContact } = require('../models/contacts')
const { addSchema } = require("../schemas/contacts")
const { HttpError } = require("../helpers")

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await addContact(req.body)
    res.status(201).json(result)    
  }
  catch (error) {
    next(error)
  }
}
  
module.exports = add