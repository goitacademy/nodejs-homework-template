const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });
};

module.exports = deleteContact;
