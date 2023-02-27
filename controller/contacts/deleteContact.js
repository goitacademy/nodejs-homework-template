const { Contact } = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = deleteContact;
