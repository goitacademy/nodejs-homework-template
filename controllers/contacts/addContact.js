const {Contact, joiSchema} = require("../../models");

const addContact = async (req, res) => {
      const {error} = joiSchema.validate(req.body);
      if(error) {
        const error = new Error("Missing required name field"); 
        error.status = 400;
        throw error;
      }
      const result = await Contact.create(req.body);
      res.status(201).json(result);
}

  module.exports = addContact; 