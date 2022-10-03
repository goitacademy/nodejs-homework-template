const { Contact, joi } = require("../../models");
const { RequestError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = joi.addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const contacts = await Contact.create(req.body);
    res.status(201).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
