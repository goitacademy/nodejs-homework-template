const contactsRepository = require("../models/contacts");

const delete_by_id = async (req, res, next) => {
  const { contactId } = req.params;

  await contactsRepository.removeContact(contactId);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  delete_by_id,
};
