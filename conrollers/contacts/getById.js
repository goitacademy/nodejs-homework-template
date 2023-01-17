const contacts = require("../../models/contacts");

const { httpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);

  if (!result) {
    throw httpError(404, "Not found");
  }

  res.json(result);
};

module.exports = getById;
