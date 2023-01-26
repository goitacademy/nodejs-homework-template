const Contact = require("../../models/contact");
const { NotFound } = require("http-errors");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    data: {
      removedContact,
    },
    message: "contact deleted",
  });
};

module.exports = remove;
