 const contacts = require('../models/contacts')
 const addSchema = require('../shemaJoi/shemaJoi');

 const addContact = async (req, res, next) => {
    try {
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw res.status(400).json({ message: `missing required ${error.details[0].context.label} field` });
      }

      const result = await contacts.addContact(req.body);
      if (!result) {
        throw res.status(404).json({ message: "Not found" });
      }
      console.log("Contact added! New lists of contacts");
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  module.exports = addContact;