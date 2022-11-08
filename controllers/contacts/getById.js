const { NotFound } = require('http-errors');
const contactOperation = require("../../models/contacts");

const getById = async (req, res) => {
      const { contactId } = req.params;
      const result = await contactOperation.getContactById(contactId);
      if(!result) {
        throw new NotFound("Not found");
      }
      res.json({
        status: "success",
        code: 200,
        data: {
          result
        }
      }); 
  }

  module.exports = getById;