const { Contact } = require("../../models/contacts/contacts");

const { HttpError} = require("../../Helpers");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getContactById,
};
