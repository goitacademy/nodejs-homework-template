
import { removeContact, validate } from '../handlers.js'

async function deleteContacts(req, res, next) {
   const contactId = req.params.contactId
    const verify = validate(contactId);
    
  if (!verify) {
    
    return res.status(404).json({ message: "Not found" })
  } else {
    
  removeContact(contactId);
  return res.status(200).json({ message: "contact deleted"})
    }
}

export {deleteContacts};