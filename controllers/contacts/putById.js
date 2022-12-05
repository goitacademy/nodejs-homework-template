const { updateContact } = require("../../models/contacts");
const { validatingSchema } = require("../../schemas/contacts");
const { HttpError } = require("../../helpers");

const putById = async (req, res, next) => {
  try {
    const { error } = validatingSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }

    const result = await updateContact(req.params.contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = putById;
