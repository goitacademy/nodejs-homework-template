const Contact = require('../../models/contact')

const add = async (req, res, next) => {
  try {
    const { _id } = req.user
    const body = req.body
    const newContact = await Contact.create({...body, owner: _id})
    res.status(201).json(newContact)
  } catch (error) {
    next(error)
  }
}

module.exports = add