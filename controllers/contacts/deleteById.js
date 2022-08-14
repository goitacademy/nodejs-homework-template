const createError = require("../../helpers");
const {Contact} = require('../../models/contact')

const deleteById = async (req, res, next) => {
      const {contactId} = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      if(!result){
        throw createError(404, "Not Found")
      }
      res.json({ message: 'contact deleted' })
  }

  module.exports = deleteById