const Contact = require("../../models/contacts");
const { requestError } = require("../../utils/index");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById({ _id: contactId });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactById;
