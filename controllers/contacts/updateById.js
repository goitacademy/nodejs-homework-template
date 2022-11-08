const Joi = require('joi');
const contactOperation = require("../../models/contacts");

const updateById = async (req, res) => {
      const { id } = req.params; 
      const result = await contactOperation.updateContact(id, req.body);
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

  module.exports = updateById;