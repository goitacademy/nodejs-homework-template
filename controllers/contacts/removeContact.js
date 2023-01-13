const { Contact } = require("../../models/contacts");
const { HttpErrors } = require("../../helpers");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpErrors(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = removeContact;
