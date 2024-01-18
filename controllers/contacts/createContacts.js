
const handler = require('../handlers')
const validator = require('../validators/contacts/createValidator')

async function createContacts(req, res, next) {
    const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
    };
    
    const resultValidate = validator.schema.validate(req.body)    
  if (resultValidate.error) {
    return res.status(400).send({ message: "missing required name - field"})
  } else {
  handler.addContact(contact);  
  return res.status(201).json(contact)
  }
}

module.exports = createContacts;