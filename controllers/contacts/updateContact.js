const contactsOperations = require("../../models/contacts");

const { addSchema } = require("../../schemas/contacts");
const { createError } = require("../../helpers/createError");

const updateContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw createError(400, (error.message = "missing fields"));
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
