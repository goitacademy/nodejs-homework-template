const {Contact}= require('../models/contact');
const { contactsAddSchema } = require('../schemas/contacts');
const { RequestError } = require('../helpers');


const updateById = async (req, res, next) => {
 const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Missing fields"); 
  }
  const { contactId} = req.params; 
  const result = await Contact.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
}

module.exports = updateById;