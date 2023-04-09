const HttpError = require("../../helpers");

const Contact = require("../../models");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404);
  }

  res.status(200).json({
    result,
    message: "Contact deleted",
  });
};

module.exports = removeContact;
