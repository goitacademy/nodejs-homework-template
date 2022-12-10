const { Contact } = require("../../models/contact")
const { HttpError } = require("../../helpers")

const getById = async (req, res, next) => {
  const { id } = req.params
  const result = await Contact.findById(id, "-createdAt -updatedAt")
  if (!result) {
    throw HttpError(400, error.message)
  }
  res.json(result)  
}

module.exports = getById