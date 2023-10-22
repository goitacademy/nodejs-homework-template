const { Contact } = require("../../models");
const { HttpError } = require("../../utils");

const deleteContact = async (req, res) => {
  const contact = await Contact.findByIdAndRemove(req.params.contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
