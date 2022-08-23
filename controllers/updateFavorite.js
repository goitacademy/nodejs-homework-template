const { Contact } = require("../models/contacts");
const { RequestErr } = require("../helpers/RequestErr");

const updateFavorite = async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true}); 
      if(!result){
        throw RequestErr(404, "Not found");
      }
      res.json(result);  
    } catch (error) {
      next(error);    
    }
}

module.exports = updateFavorite;