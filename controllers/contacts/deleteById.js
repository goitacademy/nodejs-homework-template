const { Contact } = require("../../models/contacts");

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;

  const deletedContact = await Contact.findByIdAndRemove(contactId);
  if (!deletedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
