const { removeContact } = require("../models/contacts");

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  removeContact(id);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
