const Contacts = require('../models/contacts')

const createContact = async (req, res, next) => {
      const contact = await Contacts.create(req.body)
      res.status(201).json({ status: 'success', code: 201, data: {contact}})
  }

  module.exports = createContact