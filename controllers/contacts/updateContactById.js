const { Contact } = require("../../models");
const { NotFound } = require("http-errors");
const { sendSuccessResponse } = require("../../utils");

const updateContactsById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  sendSuccessResponse(res, { contact });
};

module.exports = updateContactsById;
