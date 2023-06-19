const { Contact } = require("../../models/contact");
const { HttpError} = require("../../utils/index");

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not found user with this ID!");
  }
  res.json({
    message: "Contact deleted success!",
  });
};

module.exports = deleteContact;
