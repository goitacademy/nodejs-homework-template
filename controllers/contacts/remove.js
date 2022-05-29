const { removeContact } = require("../../models/contacts");

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }

  res.json({ message: "contact deleted" });
};

module.exports = remove;
