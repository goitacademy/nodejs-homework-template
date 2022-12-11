const HttpError = require("../../helpers");
const contacts = require("../../models/contacts");
const { addSchema } = require("../../schemas/contacts");

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, "missing fields");
    }

    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
