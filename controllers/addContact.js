 const contacts = require('../models/contacts')
 const addSchema = require('../shemaJoi/shemaJoi');

 const addContact = async (req, res, next) => {
    try {
      const { error } = addSchema.validate(req.body);
      const result = await contacts.addContact(req.body);

      if (error) {
        throw res.status(400).json({ message: `missing required ${error.details[0].context.label} field` });
      }

     console.log("Contact added!");
    res.status(201).json(result);
 

    } catch (error) {
      next(error);
    }
  };

  module.exports = addContact;