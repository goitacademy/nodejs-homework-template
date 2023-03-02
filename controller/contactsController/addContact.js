const Contacts = require("../../models/contactsSchema");
const validate = require("../../validator/ownValidate")
const addContact = async (req, res, next) => {
    try {
      validate(req.body);
      const entity = new Contacts(req.body);
  
      const record = await entity.save();
      res.status(201).json({
        status: "success",
        code: 201,
        data: { contact: record },
      });
      //
    } catch (e) {
      return next(e);
    }
  };
  module.exports=addContact;