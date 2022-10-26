const addSchema = require("../../schemas/addSchema")
const {RequestError} = require("../../helpers")
const contacts = require("../../models/contacts")

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError (400, error.message)
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

module.exports = add;