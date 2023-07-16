const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.json({
    message: "Delete succes",
  });
};

module.exports = deleteContactById;
