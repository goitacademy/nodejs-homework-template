const { Contact } = require("../models/contacts");
const { RequestErr } = require("../helpers/RequestErr");

const removeContact = async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      if(!result){
      throw RequestErr(404, "Not found");
      } 
      res.json({message:"Contact delete"});
    } catch (error) {
      next(error); 
    }
}

module.exports = removeContact;