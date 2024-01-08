// @ PUT /api/contacts/:id

const contacts = require("../../models/contacts");

const { contactSchema } = require("../../schemas/contacts");

const { createError } = require("../../helpers/createError");

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw createError(404, "Missing fields");
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

module.exports = updateContact;
