const { Contact } = require("../models/contacts");
const { RequestErr } = require("../helpers/RequestErr");


const addContact = async (req, res, next) => {
    try {
      const {error} = Contact.validate(req.body);
      if(error){
        throw RequestErr(400, error.message);
      }
      const result = await Contact.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
}

module.exports = addContact;