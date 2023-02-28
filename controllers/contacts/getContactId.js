const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getContactId = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

module.exports = getContactId;
