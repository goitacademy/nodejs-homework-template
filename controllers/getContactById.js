const { Contact } = require("../models/contacts");
const { RequestErr } = require("../helpers/RequestErr");

const getContactById = async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const result = await Contact.findById(contactId);
      if(!result){
        throw RequestErr(404, "Not found");
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  module.exports = getContactById;