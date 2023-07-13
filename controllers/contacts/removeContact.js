const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200);
  res.json({
    code: 200,
    message: "Contact deleted",
    data: result,
  });
};

module.exports = removeContact;
