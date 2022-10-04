const { Contact, contactSchemas } = require("../../models");
const { requestError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchemas.addSchema.validate(req.body);
    if (error) {
      throw requestError(400, error.message);
    }
    const contacts = await Contact.create(req.body);
    res.status(201).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
