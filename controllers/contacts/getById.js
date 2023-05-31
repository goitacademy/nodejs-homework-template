const { NotFound } = require("http-errors");
const { getContactById } = require("../../models/contacts");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    throw new NotFound("Not found");
  }
  res.status(200).json(result);
};

module.exports = getById;