const { Contact } = require("../models/contact");
const { HttpError } = require("../helpers");

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log("id", contactId);
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, `${req.params.contactId} not found`);
  }

  res.status(200).json(result);
};

module.exports = getById;
