const updateContact = require("../model/updateContact");

const patchContact = async (req, res, next) => {
  const data = await updateContact(req.params.contactId, req.body);
  res.status(200).json(data);
};

module.exports = patchContact;
