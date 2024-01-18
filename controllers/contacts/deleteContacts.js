
const handler = require('../handlers')

async function deleteContacts(req, res, next) {
   const contactId = req.params.contactId
    const validate = handler.validate(contactId);
    
  if (!validate) {
    
    return res.status(404).json({ message: "Not found" })
  } else {
    
  handler.removeContact(contactId);
  return res.status(200).json({ message: "contact deleted"})
    }
}

module.exports = deleteContacts;