const { removeContact } = require("../../models/contacts");

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    return res.status(400).json({ status: 400, message: "Not found" });
  }
  res.status(200).json({ data, status: 200, message: "contact deleted" });
};
module.exports = {
  remove,
};
