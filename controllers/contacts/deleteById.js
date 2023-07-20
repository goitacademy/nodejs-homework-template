const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "delete success" });
};

module.exports = deleteById;
