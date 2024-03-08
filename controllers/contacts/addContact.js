const {Contact, schemas} = require("../../models/contact");

const {HttpError} = require("../../helpers");

const addContact = async (req, res) => {
    const {error} = schemas.addSchema.validate(req.body);
      if(error) {
        throw HttpError(400, error.message);
      }
      const{_id: owner} = req.user;
      const result = await Contact.create({...req.body, owner});
      res.status(201).json(result);
  };


module.exports = addContact;