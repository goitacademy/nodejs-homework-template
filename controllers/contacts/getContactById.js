const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id, "-createdAt -updatedAt");
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

module.exports = getById;
