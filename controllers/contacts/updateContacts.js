
const handler = require('../handlers')
const validator = require('../validators/contacts/createValidator')

async function updateContacts(req, res, next) {
    const contactId = req.params.contactId
     const body = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
 
    const result = validator.schema.validate(req.body)   
  
    if (result.error) {
      
    return res.status(400).json({ message: "missing fields" })
    }
    const contact = handler.validate(contactId)
  if (contact) {
    handler.updateContact(contactId, body)
    return res.status(200).json(contact)
  }
  else {
    return res.status(404).json("Not found")
   
  }   
}

module.exports = updateContacts;