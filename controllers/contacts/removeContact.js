const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  const contact = await Contact.findOneAndDelete({ _id: contactId, owner });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContact;
