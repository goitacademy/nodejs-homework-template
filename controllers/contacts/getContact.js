const { Contact } = require("../../models/contact/contact");

const { HttpError } = require("../../helpers");

const getContact = async (req, res) => {
  const result = await Contact.findById(
    req.params.contactId,
    "-createdAt -updatedAt"
  ).exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send(result);
};

module.exports = getContact;
