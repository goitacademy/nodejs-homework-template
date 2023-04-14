const { Contact } = require("../models/contact");

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteById;
