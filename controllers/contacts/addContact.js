
const { Contact, contactsJoiSchemas } = require("../../models");
const { RequestError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactsJoiSchemas.addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { _id } = req.user;
    const contacts = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(contacts);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
