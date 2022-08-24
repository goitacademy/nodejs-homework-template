const {Contact, contactJoiSchema} = require("../../models");

const updateContact = async (req, res) => {
      const {error} = contactJoiSchema.validate(req.body);
      if(error) {
        const error = new Error("Missing fields"); 
        error.status = 400;
        throw error;
      }
      const {id} = req.params;
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
      if(!result) {
        const error = new Error("Not found"); 
        error.status = 404;
        throw error;
      }
      res.json(result);
  }

  module.exports = updateContact;