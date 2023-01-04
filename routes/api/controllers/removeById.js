const contacts = require("../../../models/contacts");

const removeById = async (req, res, next) => {
  const findContact = await contacts.getContactById(req.params.id);
  if (findContact === null) {
    res.status(404).json({ message: "Not Found" });
  }
  await contacts.removeContact(req.params.contactId);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeById;
