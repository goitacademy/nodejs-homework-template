
import { updateStatusContact, validate } from '../handlers.js'
import {schema} from '../validators/contacts/patchValidator.js'

async function changeContacts(req, res, next) {
    const contactId = req.params.contactId
    const newFavorite = req.body.favorite
    const result = schema.validate(req.body)
    

     if (result.error) {
      console.log(result.error)
    return res.status(400).json({ message: "missing field favorite" })
    }
  const contact = await validate(contactId)

  if (contact) {
    const newContact = await updateStatusContact(contactId, newFavorite)
    return res.status(200).json(newContact)
  }
  else {
    return res.status(404).json("Not found")
   
  }   
}
    

export {changeContacts};