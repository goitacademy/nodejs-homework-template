const Joi = require('joi');
const { Contact } = require("../../model");

const updateById = async (req, res) => {
      const { id } = req.params; 
      const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
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