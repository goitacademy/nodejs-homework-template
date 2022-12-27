const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete succes" });
};

module.exports = removeById;
