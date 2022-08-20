const contacts = require("../../models/contacts");
const { requestError } = require("../../helpers/");

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw requestError(404, `Id ${id} not found, try a different id`);
  }
  res.json(result);
};

module.exports = getContactById;
