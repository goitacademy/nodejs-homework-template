const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw new HttpError(404, "Contacts with such id is not found");
  }
  res.json({ message: "Deleted successfuly" });
};

module.exports = removeContact;
