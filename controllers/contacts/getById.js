const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;
  console.log(contactId);
  console.log(req.params);
  const result = await Contact.findById(contactId, owner);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
