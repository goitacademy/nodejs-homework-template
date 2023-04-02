const { HttpError } = require("../helpers");
const contactsOperation = require("../models/contacts");
const addSchema = require("../schemas");

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.details[0].message);
    }
    const result = await contactsOperation.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
