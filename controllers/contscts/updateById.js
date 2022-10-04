const contacts = require("../../models/contacts");
const { RequestError } = require("../../utils");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json(result);
};

module.exports = updateById;
