const { removeContact } = require('../models/contacts')
const { HttpError } = require("../helpers")

const remove = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await removeContact(id)
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({
      message: 'contact deleted'
    })
  }
  catch (error) {
    next(error)
  }
}
  
module.exports = remove