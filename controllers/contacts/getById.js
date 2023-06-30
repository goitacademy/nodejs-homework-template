const { NotFound } = require("http-errors");

const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;

  const getContact = await Contact.findById(contactId);
  if (!getContact) {
    throw new NotFound(`Contact not found`);
  }
  res.status(200).json({
    message: "the id request was made successfully",
    result: { getContact },
  });
};

module.exports = getById;
