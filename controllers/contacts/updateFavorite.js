const Contact = require("../../models/contactSchema.js");
const {joiFavorite} = require("../../utils/joiValidation.js");

const updateFavorite = async (req, res, next) => {
    
      if (!req.body.hasOwnProperty("favorite")) {
        res.status(400).json({ message: "missing field favorite" });
      }
  
      const validationError = joiFavorite(req.body);
      if (validationError) {
        const error = requestError(400, validationError.message);
        throw error;
      }
  
      const { contactId } = req.params;
      const {favorite} = req.body;
      
      const data = await Contact.findOneAndUpdate({_id: contactId}, {favorite}, {new: true});
      
      if(!data) {
        const error = {status: 404, message: "Not found"};
        throw error;

      }
      res.json(data);
   
  }

  module.exports = updateFavorite;