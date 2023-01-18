const { listContacts } = require('../models/contacts.js')

const getContactControllers = async (req, res) => { 
  try {
    const contact = await listContacts()
    return res.status(200).json ({contact})
  } catch (error) {
    res.status(500).json ({message: error.message})
  }
}

module.exports = {getContactControllers}