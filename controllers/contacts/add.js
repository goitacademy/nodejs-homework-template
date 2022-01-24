const CreateError = require("http-errors");

const contacts = require("../../models/contacts");
const {contactSchema} = require("../../schemas");

const add = async (req, res, next) => {
    try {
      const { error } = contactSchema.validate(req.body);
      if (error) {
        throw new CreateError(400, {
          message: `Missing required field: ${error.message}`,
        });
      }
      const { name, email, phone } = req.body;
      const result = await contacts.addContact(name, email, phone);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  module.exports = add;