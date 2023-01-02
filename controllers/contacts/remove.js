// const { removeContact } = require("../../models/contacts");
const { Contact } = require("../../models/contacts");
const remove = async (req, res, next) => {
  const requestId = req.params.contactId;
  // const contact = await removeContact(requestId);

  const contact = await Contact.findByIdAndRemove(requestId);

  if (!contact) {
    const error = new Error("Not found");
    error.status = 404;
    throw error;
  }
  res.status(200).json({ message: "contact deleted", data: { contact } });
};

module.exports = remove;
