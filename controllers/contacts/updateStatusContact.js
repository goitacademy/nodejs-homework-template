const { Contact } = require("../../models/contact/contact");

const { HttpError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const result = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  ).exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send(result);
};

module.exports = updateStatusContact;
