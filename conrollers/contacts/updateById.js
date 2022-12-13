const contacts = require("../../models/contacts");

const { httpError } = require("../../helpers");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateById;
