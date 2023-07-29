const {
  contactsModel: { Contact },
} = require("../../models");
const { HttpError } = require("../../helpers");

const removeContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200);
  res.json({ message: "Contact deleted" });
};

module.exports = removeContactById;
