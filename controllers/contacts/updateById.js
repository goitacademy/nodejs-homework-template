const contacts = require('../../models/contacts');
const { addSchema } = require('../../schemas/contacts');
const { RequestError } = require('../../helpers');


const updateById = async (req, res, next) => {
 const { error } = addSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Missing fields"); 
  }
  const { contactId} = req.params; 
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
}

module.exports = updateById;