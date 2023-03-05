const { removeContact } = require("../services");

const removeContactCtrl = async (req, res) => {
  const { contactId } = req.params;

  const deleted = await removeContact(contactId);

  if (!deleted) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeContactCtrl;
