const Contacts = require("../../models/contactModel")

const getAll = async (req, res, next) => {
  try {
    const allContacts = await Contacts.find()
    
    console.log('asdf')
    res.json(allContacts)
  } catch (err) {
    next(err)
  }
}

module.exports = getAll