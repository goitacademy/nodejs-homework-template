const { dataValidator, HttpError } = require("../helpers");
const { updateContact } = require("../models/contacts");

const updateContactById = async (req, res, next) => {
  try {
    const { error } = await dataValidator(req.body);

    if (error) {
      throw HttpError(400, "Missing fields");
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
