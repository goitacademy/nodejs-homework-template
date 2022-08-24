const {Contact, contactJoiSchema} = require("../../models/contact");

const addContact = async (req, res) => {
      const {error} = contactJoiSchema.validate(req.body);
      if(error) {
        const error = new Error("Missing required name field"); 
        error.status = 400;
        throw error;
      }
    const {_id} = req.user;
    const result = await Contact.create({...req.body, owner:_id}).populate("owner", "_id email");
      res.status(201).json(result);
}

  module.exports = addContact; 