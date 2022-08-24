const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
