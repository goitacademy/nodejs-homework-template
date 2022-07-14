const contacts = require("../../models/contacts");
const { addSchema } = require("../../schemas/contacts");
const { createError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw createError(404, error.message);
    }

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw createError(404, error.message);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
