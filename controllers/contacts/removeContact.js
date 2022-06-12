const { Contact } = require("../../models");

const { NotFound } = require("http-errors");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(`Contact with id ${contactId} not found!`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
  });
};

module.exports = removeContact;
