const contacts = require("../../models/contacts");

const ReqErr = require("../../helpers/ReqErr");

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContactById(contactId, req.body);
  if (!result) {
    throw ReqErr(404, "Not found");
  }
  res.json(result);
};

module.exports = updateContactById;
