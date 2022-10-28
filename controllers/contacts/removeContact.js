const { Contact } = require("../../models/contact");

const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted" });
};
module.exports = { removeContact };
