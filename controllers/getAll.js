const Contacts = require('../models/contacts')

const getAll = async (req, res, next) => {
      const contacts = await Contacts.find()
      res.json({ status: 'success', code: 200, data: {contacts}})
}

  module.exports = getAll