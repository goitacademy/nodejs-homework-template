const Contact = require("../../models/contactsModel");
const RequestError = require("../../helpers/RequestError");

const removeItem = async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeItem;
