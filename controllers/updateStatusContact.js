const Contact = require("../models/contact");
const createError = require("../helpers/createError");
const createResponse = require("../helpers/createResponse");
const { favoriteSchema } = require("../validation/schema");

async function updateStatusContact(req, res, next) {
  const { favorite } = req.body;
  const { contactId } = req.params;
  try {
    const { error } = favoriteSchema.validate({ favorite });
    if (error) throw createError(400, "missing field favorite");

    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );

    if (!result) throw createError(404);

    createResponse(200, res, result);
  } catch (error) {
    next(error);
  }
}

module.exports = updateStatusContact;
