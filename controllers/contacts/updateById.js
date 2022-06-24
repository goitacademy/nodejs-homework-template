const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");
const { contactAddScheme } = require("../../schemas/contacts");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactAddScheme.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
