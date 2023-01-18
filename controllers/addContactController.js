const { addContact } = require('../models/contacts')

const addContactController = async (req, res) => { 
  try {
    const data = await addContact(req.body)
    return res.status(200).json(data)
  } catch (error) {
    next(error);
  }
}

module.exports = {addContactController}