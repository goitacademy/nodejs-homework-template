const contacts = require("../../models/contacts");
const { HttpErrors } = require("../../helpers");

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);

  if (!result) {
    throw HttpErrors(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};

module.exports = removeContact;
