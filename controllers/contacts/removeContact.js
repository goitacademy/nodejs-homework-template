const contactsOperation = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contactsOperation.removeContact(id);
  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json({
    result,
    message: "Contact deleted",
  });
};

module.exports = removeContact;
