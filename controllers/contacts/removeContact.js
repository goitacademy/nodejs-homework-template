const { NotFound } = require("http-errors");
const { Contact } = require("../../models");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const removeContact = await Contact.findByIdAndRemove(contactId);
  if (!removeContact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: removeContact,
    },
  });
};

module.exports = removeContact;
