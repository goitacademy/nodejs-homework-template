const { removeContact } = require("../../models");
const { NotFound } = require("http-errors");
const { getSuccessResponse } = require("../../utils");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} was not found`);
  }

  res.status(204).json(getSuccessResponse(contact));
};

module.exports = removeById;
