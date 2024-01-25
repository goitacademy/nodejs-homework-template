
import { updateContact, validate } from '../handlers.js'
import {schema} from '../validators/contacts/updateValidator.js'

async function updateContacts(req, res, next) {
    const contactId = req.params.contactId
     const body = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  };
 
    const result = schema.validate(req.body)   
  
    if (result.error) {
      
    return res.status(400).json({ message: "missing fields" })
    }
    const contact = validate(contactId)
  if (contact) {
    updateContact(contactId, body)
    return res.status(200).json(contact)
  }
  else {
    return res.status(404).json("Not found")
   
  }   
}

export {updateContacts};