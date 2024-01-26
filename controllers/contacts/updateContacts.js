
import { updateContact, validate } from '../handlers.js'
import {schema} from '../validators/contacts/updateValidator.js'

async function updateContacts(req, res, next) {
    const contactId = req.params.contactId
     const body = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite
    
  };
 
    const result = schema.validate(req.body)   
  
    if (result.error) {
      
    return res.status(400).json({ message: "missing fields" })
    }
  const contact = await validate(contactId)
// ALBO TAK MA BYĆ ALBO W TREŚCI ZADANIA DLA MODUŁU 2 JEST BŁĄD
  if (contact) {
    const newContact = await updateContact(contactId, body)
    return res.status(200).json(newContact)
  }
  else {
    return res.status(404).json("Not found")
   
  }   
}

export {updateContacts};