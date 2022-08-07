const { Contact } = require("../../models");
const { addSchema } = require("../../schemas/contact");
const { createError } = require("../../helpers");

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw createError(404, error.message);
    }

    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
