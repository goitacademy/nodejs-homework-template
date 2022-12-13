const { Contact } = require("../../models");
const { contactSchemas } = require("../../schemas");
const { HttpError } = require("../../helpers");

const updateById = async (req, res, next) => {
  try {
    const { error } = contactSchemas.validatingSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }

    const result = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
