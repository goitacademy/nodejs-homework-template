const Joi = require('joi');
const { Contact } = require("../../model");

const updateFavorite = async (req, res) => {
      const { id } = req.params; 
      const { favorite } = req.body;
      const result = await Contact.findByIdAndUpdate(id, {favorite}, {new: true});
      if(!result) {
        throw new NotFound("missing field favorite");
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      }); 
  }

  module.exports = updateFavorite;