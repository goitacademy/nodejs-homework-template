const { removeContact } = require('../models/contacts')

const removeContactController = async (req, res) => { 
  try {
    const deleteContact = await removeContact(req.params.contactId)
    if (deleteContact) { 
      return res.status(200).json({message: "contact has been remove"})
    }
  } catch (error) {
    console.log(message.error);
  }
}

module.exports = {removeContactController}