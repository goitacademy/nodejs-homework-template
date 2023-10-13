const Contact = require("../../models/contactSchema.js");
const {joiValidationRequired} = require('../../utils/joiValidation.js');
const requestError = require('../../utils/requestError.js');

const addContact = async (req, res, next) => {
        
      const { name, email, phone } = req.body;
      const validationError = joiValidationRequired({ name, email, phone });
  
      if (validationError) {
        const err = requestError(400, validationError.message);
        throw err;
      }
      const newContact = {
        name,
        email,
        phone,
      };
  
      const result = await Contact.create(newContact);
      res.json({
        status: "created",
        code: 201,
        data: result,
      });
  
  }

  module.exports = addContact;