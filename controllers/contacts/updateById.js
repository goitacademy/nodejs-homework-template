const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContactById(contactId, req.body);
  if (!result) {
    throw RequestError({ status: 404 });
  }
  res.json(result);
};

module.exports = updateById;
