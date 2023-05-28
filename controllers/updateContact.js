const contacts = require('../models/contacts');
const addSchema = require('../shemaJoi/shemaJoi');

 const updateContact  = async (req, res, next) => {
    try {
      const { error } = addSchema.validate(req.body);
      if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
        throw res.status(400).json({ message: "missing fields" });
      }
  
      if (error) {
        throw res.status(400).json({ message: `missing required ${error.details[0].context.label} field` });
      }
      const { contactId } = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if (!result) {
        throw res.status(404).json({ message: "Not found" });
      }
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }


  module.exports  = updateContact;