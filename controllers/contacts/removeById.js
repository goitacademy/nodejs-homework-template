const { NotFound } = require('http-errors');
const contactOperation = require("../../models/contacts");

const removeById = async (req, res) => {
      const { contactId } = req.params; 
      const result = await contactOperation.removeContact(contactId);
      if(!result) {
        throw new NotFound("Not found");
      }
      res.json({
        status: "success",
        code: 200,
        message: "contact deleted",
        data: {
          result
        }
      }); 
  }

  module.exports = removeById;