const { removeContact } = require("../../models/contacts");

const removeContactById = async (req, res, next) => {
  const { ownerId } = req.user;
  const { contactId } = req.params;
  const data = await removeContact(contactId, ownerId);
  if (!data) {
    return res.status(400).json({ status: 400, message: "Not found" });
  }
  res.status(200).json({ data, status: 200, message: "contact deleted" });
};
module.exports = removeContactById;
