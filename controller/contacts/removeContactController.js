const { removeContactService } = require("../../servises/removeContactService");

const removeContactController = async (req, res) => {
  const { _id } = req.user;
  const { contactId } = req.params;
  const data = await removeContactService(contactId, _id);
  res.status(200).json({ message: "contact deleted" });
};

module.exports = removeContactController;
