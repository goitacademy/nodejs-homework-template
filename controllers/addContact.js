const contacts = require("../models/contacts");
const { RequestError } = require("../helpers");
const { addSchema } = require("../schemas/contacts");

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      // res.status(400).json("error");
      throw RequestError(400, error.message);
    }

    const result = await contacts.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
