const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  if (!req.body) {
    throw HttpError(200, "missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found id");
  }
  res.json(result);
};

module.exports = updateStatusContact;
