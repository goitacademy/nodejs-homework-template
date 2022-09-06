const contacts = require("../models/contacts");
const { RequestError } = require("../helpers");
const { updateSchema } = require("../schemas/contacts");

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "missing required name field");
    }

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
