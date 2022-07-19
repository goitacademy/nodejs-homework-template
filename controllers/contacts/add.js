const {joiSchema} = require("../../models")
const createError = require("../../helpers");

const {Contact} = require('../../models/contact')

const add = async (req, res, next) => {
      const {error} = joiSchema.validate(req.body);
      if(error){
        throw createError(400, "missing fields")
      }
      const result = await Contact.create(req.body);
      res.status(201).json({
        status: "success",
        code: 201,
        data: {result}})
  }

module.exports = add;