const contactOperation = require("../../models/contacts");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactOperation.removeContact(contactId);
  if (!result) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.json({ message: "contact deleted" });
};

module.exports = deleteContact;
