const {Contact} = require('../../models')
const createError = require("../../helpers")

const getById = async (req, res, next) => {
      const {contactId} = req.params;
      const result = await Contact.findById(contactId);
      if(!result){
        throw createError(404, "Not Found")
      }
      res.json({
        status: "success",
        code: 200,
        data: result
      })
    
  }

  module.exports = getById;