const {Contact, contactUpdateFavoriteSchema } = require("../../models");

const updateFavorite = async (req, res) => {
      const {error} = contactUpdateFavoriteSchema.validate(req.body);
      if(error) {
        const error = new Error("Missing fields"); 
        error.status = 400;
        throw error;
      }
      const {id} = req.params;
      const {favorite} = req.body;
      const result = await Contact.findByIdAndUpdate(id, {favorite}, {new: true});
      if(!result) {
        const error = new Error("Not found"); 
        error.status = 404;
        throw error;
      }
      res.json(result);
  }

  module.exports = updateFavorite;