const { getContactById } = require("../../models");
const { NotFound } = require("http-errors");
const { getSuccessResponse } = require("../../utils");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw new NotFound(`Contact with id=${contactId} was not found`);
  }

  res.json(getSuccessResponse(contact));
};

module.exports = getById;
