const Contact = require("../../models/contacts");
const { requestError } = require("../../utils");

const getByIdContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById({ _id: contactId });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getByIdContact;
