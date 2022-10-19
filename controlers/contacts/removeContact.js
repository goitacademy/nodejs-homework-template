const { Contact } = require("../../models/Contact");
const { RequestError } = require("../../helpers");
const removeContact = async (req, res, next) => {
  const result = await Contact.findByIdAndRemove(req.params.contactId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};
module.exports = removeContact;
