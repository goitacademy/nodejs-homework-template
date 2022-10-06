const contacts = require("../../models/contacts/index");

const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getById(id);
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = getById;
