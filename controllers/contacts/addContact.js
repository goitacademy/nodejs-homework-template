const contacts = require("../../models/contacts");

const { addSchema } = require("../../schemas/contact");

const { RequestError } = require("../../helpers/RequestError");

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      next(RequestError(400, error.message));
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
