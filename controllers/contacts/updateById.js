const {joiSchema} = require("../../models")
const createError = require("../../helpers");
const {Contact} = require('../../models/contact')


const updateById = async (req, res, next) => {
      const {error} = joiSchema.validate(req.body);
      if(error){
        throw createError(400, "missing fields")
      }
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
      if(!result){
        throw createError(404, "Not Found");
      }
      res.json({
        status: "success",
        code: 200,
        data: {result}})
    
  }

  module.exports = updateById;