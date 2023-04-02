const contactsOperation = require("../models/contacts");
const addSchema = require("../schemas");
const { HttpError } = require("../helpers");

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }
    const { id } = req.params;
    const result = await contactsOperation.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
