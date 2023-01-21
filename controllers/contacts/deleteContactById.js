const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const deleteContactById = async (req, res, next ) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({
    message: `Contact with id=${contactId} deleted`,
  });
};

module.exports = deleteContactById;

