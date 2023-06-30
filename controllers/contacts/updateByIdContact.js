const Contact = require("../../models/contacts.js");
const { requestError } = require("../../utils");

const updateContactById = async (req, res, _) => {
  const { contactId } = req.params;
  const { body } = req;
  const result = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateContactById;
