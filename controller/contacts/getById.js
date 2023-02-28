const { Contact } = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(404, "Not Found");
  }
  res.json(result);
};

module.exports = getById;
