
import {addContact} from "../handlers.js"
import { schema } from '../validators/contacts/createValidator.js'

async function createContacts(req, res, next) {
    const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite
    };
    
    const resultValidate = schema.validate(req.body)    
  if (resultValidate.error) {
    return res.status(400).send({ message: "missing required name - field"})
  } else {
  addContact(contact);  
  return res.status(201).json(contact)
  }
}

export {createContacts};