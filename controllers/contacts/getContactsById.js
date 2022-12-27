const Contacts = require("../../models/contact");
const { HttpError } = require("../../helpers/HttpError");

const getContactsById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contacts.findById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactsById;
