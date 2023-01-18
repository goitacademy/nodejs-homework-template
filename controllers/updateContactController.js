const { updateContact } = require('../models/contacts')

const updateContactController = async(req, res) => { 
  const results = await updateContact(req.params.contactId, req.body)
  if (results) { 
    return res.json(results)
  } return res.status(400).json({message: error})
}

module.exports = {updateContactController}