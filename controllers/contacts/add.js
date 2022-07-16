const {contactAddSchema} = require("../../schemas")
const createError = require("../../helpers");
const contacts = require("../../models/contacts");

const add = async (req, res, next) => {
    try {
      const {error} = contactAddSchema.validate(req.body);
      if(error){
        throw createError(400, "missing fields")
      }
      const result = await contacts.addContact(req.body);
      res.status(201).json(result)
    } catch (error) {
      next(error)
    }
    
  }

module.exports = add;