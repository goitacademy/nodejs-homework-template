const { updateByContactId } = require('../models/contacts')
const { addSchema } = require("../schemas/contacts")
const { HttpError } = require("../helpers")

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const { id } = req.params
    const result = await updateByContactId(id, req.body)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
}

module.exports =   updateById