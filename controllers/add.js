const Contact = require('../models/contact')

const add = async (req, res, next) => {
  try {
    const body = req.body
    const newContact = await Contact.create(body)
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
}

module.exports = add