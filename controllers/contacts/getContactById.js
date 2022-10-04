const contacts = require("../../models/contacts");

const ReqErr = require("../../helpers/ReqErr.js");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw ReqErr(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactById;
