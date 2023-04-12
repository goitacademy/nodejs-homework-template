const { updateContact } = require("../../models/contacts");
//
const updateById = async (req, res) => {
  const id = req.params.contactId;
  const result = await updateContact(id, req.body);
  res.status(200).json(result);
};
module.exports = updateById;
