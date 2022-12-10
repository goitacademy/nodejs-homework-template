const schemaContacts = require('../../models/schemaContacts')

const getContacts = async (req, res, next) => {
    try {
      const result = await schemaContacts.find()
      res.json(result)
    } catch (error) {
      next(error)
    }
  }

module.exports = getContacts