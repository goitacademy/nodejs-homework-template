
const handler = require('../handlers')

async function createContacts(req, res, next) {
    const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
    };
    
    const result = handler.schema.validate(req.body)    
  if (result.error) {
    return res.status(400).send({ message: "missing required name - field"})
  } else {
  handler.addContact(contact);  
  return res.status(201).json(contact)
  }
}

module.exports = createContacts;