const contacts = require("../../models/contacts");
const { HttpErrors } = require("../../helpers");

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);

  if (!result) {
    throw HttpErrors(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
