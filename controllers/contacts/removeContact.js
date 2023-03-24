const { Contact } = require("../../models/contact");

const { IdError } = require("../../errorHandlers/");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw new IdError(contactId);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: removedContact,
    },
  });
};

module.exports = removeContact;
