const { Contact } = require("../../models/contacts");
const { BadRequest } = require("http-errors");
const { JoiSchemas } = require("../../models/contacts");



const addContact = async (req, res, next) => {
    try {
      const { error } = JoiSchemas.contactObjectSchema.validate(req.body);
      console.log(error);
      if (error) {
        throw new BadRequest("missing required name field");
      }
      const { _id: owner } = req.user;
      const result = await Contact.create({ ...req.body, owner: owner });
      console.log(result);
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          result,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  module.exports = addContact;