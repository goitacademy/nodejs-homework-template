const contacts = require('../../models/contacts');
const { addSchema } = require('../../schemas/contacts');
const { RequestError } = require('../../helpers');

const add = async (req, res) => {
 const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing required name field"); 
  }
   const result = await contacts.addContact(req.body);
   res.status(201).json(result);
}

module.exports = add;