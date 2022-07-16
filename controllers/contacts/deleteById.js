const createError = require("../../helpers");
const contacts = require("../../models/contacts");

const deleteById = async (req, res, next) => {
    try {
      const {contactId} = req.params;
      const result = await contacts.removeContact(contactId);
      if(!result){
        throw createError(404, "Not Found")
      }
      res.json({ message: 'contact deleted' })
    } catch (error) {
      next(error)
    }
    
  }

  module.exports = deleteById