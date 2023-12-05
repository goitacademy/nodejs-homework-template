const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  console.log(req.params);
  const result = await Contact.findById(contactId);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
