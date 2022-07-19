const {favoriteJoiSchema} = require("../../models")
const createError = require("../../helpers");
const {Contact} = require('../../models/contact')


const updateFav = async (req, res, next) => {
      const {error} = favoriteJoiSchema.validate(req.body);
      if(error){
        throw createError(400, "missing field favorite")
      }
      const {contactId} = req.params;
      const {favorite} = req.body;
      const result = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true});
      if(!result){
        throw createError(404, "Not Found");
      }
      res.json({
        status: "success",
        code: 200,
        data: {result}})
    
  }

  module.exports = updateFav;