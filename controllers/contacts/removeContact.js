const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const deleteById = async (req, res) => {
  const id = req.params.id;
  const removedContact = await Contact.findByIdAndDelete(id);
  if (!removedContact) {
    throw HttpError(400, "Not found");
  }
  res.status(200).json(removedContact);
};

module.exports = deleteById;
