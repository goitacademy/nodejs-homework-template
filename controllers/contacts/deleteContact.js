const { removeContact } = require("../../model");

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await removeContact(id);
  if (contact) {
    return res.status(200).json({ message: "contact deleted" });
  }
  res.status(404).json({ message: "Not found" });
};
module.exports = deleteContact;
