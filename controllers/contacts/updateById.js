const {contactAddSchema} = require("../../schemas")
const createError = require("../../helpers");
const contacts = require("../../models/contacts");


const updateById = async (req, res, next) => {
    try {
      const {error} = contactAddSchema.validate(req.body);
      if(error){
        throw createError(400, "missing fields")
      }
      const {contactId} = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if(!result){
        throw createError(404, "Not Found");
      }
      res.json(result)
    } catch (error) {
      next(error)
    }
    
  }

  module.exports = updateById;