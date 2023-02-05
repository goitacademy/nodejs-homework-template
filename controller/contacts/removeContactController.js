const { removeContactService } = require("../../servises/removeContactService");

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContactService(contactId);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContactController;
