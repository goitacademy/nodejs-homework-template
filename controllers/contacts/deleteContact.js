const { Contact } = require("../../models/contact/contact");

const { HttpError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const result = await Contact.findByIdAndDelete(req.params.contactId).exec();
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.send({ message: "contact deleted" });
};

module.exports = deleteContact;
