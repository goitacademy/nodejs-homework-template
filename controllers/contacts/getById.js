const Contact = require("../../models/contactsModel");
const RequestError = require("../../helpers/RequestError");

const getById = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findById(id);
  if (!result) {
    throw RequestError(400, "Not found");
  }
  res.status(200).json(result);
};

module.exports = getById;
