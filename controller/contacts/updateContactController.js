const { updateContactService } = require("../../servises/updateContactService");

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const data = await updateContactService(contactId, name, email, phone);
  res.status(200).json({ data });
};

module.exports = updateContactController;
