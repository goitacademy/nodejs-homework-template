const { getContactById } = require('../models/contacts')
const { HttpError } = require("../helpers")

const getById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await getContactById(id)
    if (!result) {
      throw HttpError(400, error.message)
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }  
}

module.exports = getById