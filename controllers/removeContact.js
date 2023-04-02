const contactsOperation = require("../models/contacts");
const { HttpError } = require("../helpers");

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperation.removeContact(id);
    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json({
      result,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
