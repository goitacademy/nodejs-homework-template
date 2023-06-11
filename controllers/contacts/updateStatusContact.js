const { Contact } = require("../../models/contact");

const { HttpError } = require("../../utils");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!req.body) {
    throw HttpError(400, "missing field favorite");
  }
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateStatusContact;
