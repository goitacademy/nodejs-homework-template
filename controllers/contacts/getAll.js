const Contact = require('../../models/contact')

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user
    const contacts = await Contact.find({owner: _id})
    res.json(contacts)
  } catch (error) {
    next(error)
  }
}

module.exports = getAll