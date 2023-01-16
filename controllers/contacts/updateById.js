const { updateContact } = require("../../models");
const { NotFound } = require("http-errors");
const { getSuccessResponse } = require("../../utils");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const contact = await updateContact(contactId, name, email, phone);

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} was not found`);
  }

  res.json(getSuccessResponse(contact));
};

module.exports = updateById;
