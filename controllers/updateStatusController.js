const { updateStatusContact } = require('../models/contacts')

const updateStatusContactController = async (req, res) => { 
  try {
    const data = await updateStatusContact(contactId)
    
    if (!data) { 
      res.status(400).json({"message": "missing field favorite"})
    }
  } catch (error) {
    console.log(message.error);
  }
}

module.exports = {updateStatusContactController}