const RequsetError = require("../../helpers");
const Contact = require("../../models/contact");

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw RequsetError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContact;
