const { HttpError } = require("../helpers");
const { getContactById } = require("../models/contacts");

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContact;
