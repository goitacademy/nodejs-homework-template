const { removeContact } = require("../models/contacts");
const { HttpError } = require("../helpers");

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = remove;
