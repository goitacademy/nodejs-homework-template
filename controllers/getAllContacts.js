const { listContacts } = require('../models/contacts')

const getAll = async (req, res, next) => {
  try {
    const result = await listContacts()
    res.json(result)
  }
  catch (error) {
    next(error)
  } 
}

module.exports = getAll