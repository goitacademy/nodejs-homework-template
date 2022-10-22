const service = require("../../service/contacts");

const removeById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await service.removeContact(contactId);
  if (contact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    next();
  }
};

module.exports = removeById;