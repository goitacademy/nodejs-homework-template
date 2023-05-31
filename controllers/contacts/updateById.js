const { NotFound } = require("http-errors");
const { updateContactById } = require("../../models/contacts");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContactById(contactId, req.body);
  if (!result) {
    throw new NotFound("Not found");
  }
  res.status(200).json(result);
};

module.exports = updateById;